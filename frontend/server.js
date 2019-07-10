const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const get = require('lodash/get');
const cors = require('cors')
require("babel-core/register");

const session = require('./app/middlewares/session');
const setServerInfo = require('./app/routes/setServerInfo');
const setVueContext = require('./app/routes/setVueContext');
const createRenderer = require('./app/render/createRenderer');

const resolve = file => path.resolve(__dirname, file);

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.disable('x-powered-by');
app.use(cors());

const api = require('./middleware/api');
const config = require('./config/common');

let renderer;
let readyPromise;
let googleTagManager = '';
const templatePath = resolve('./src/index.template.html');
const googleTagManagerPath = resolve('./src/assets/googletagmanager.html');

if (isProduction) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  googleTagManager = fs.readFileSync(googleTagManagerPath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    template,
    clientManifest,
  });
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    },
  );
}
const serve = (pathLocal, cache) => express.static(resolve(pathLocal), {
  maxAge: cache && isProduction ? 1000 * 60 * 60 * 24 * 30 : 0,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression({ threshold: 0 }));
// app.use(favicon('./public/favicon.ico'));
app.use('/dist', serve('./dist', true));
app.use('/img', serve('./static/img', true));
app.use(session);

function handleError(err, req, res) {
  if (err.url) {
    res.redirect(err.url);
  } else if (err.code === 404) {
    res.status(404).send('404 | Page Not Found');
  } else {
    // Render Error Page or Redirect
    res.status(500).send('500 | Internal Server Error');
    console.error(`error during render : ${req.url}`);
    console.error(err.stack);
  }

}

function render(req, res) {
  const s = Date.now();
  const { context } = res.locals;

  res.setHeader('Content-Type', 'text/html');

  context.googleManager = googleTagManager;

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err, req, res);
    }

    const code = get(context, 'state.errorResponse.code', 200);
    res.status(code).send(html);

    if (!isProduction) {
      console.log(`whole request: ${Date.now() - s}ms`);
    }
  });
}

app.post('/session', (req, res) => {
  if (!req.body.auth) return res.status(400).send({ success: false })
  const { auth, firstname, token, user_id } = req.body;
  req.session.user = {
    auth,
    profile: {
      firstname,
    },
    token,
    user_id,
  };
  res.json({ success: true })
})

// app.put('/session', (req, res) => {
//   if (req.session.user) {
//     const { firstname, lastname, image } = req.body;
//     req.session.user.profile = {firstname, lastname, image};
//
//     return res.json({ success: true })
//   }
//   res.status(403).send({ success: false })
// })

app.delete('/session', (req, res) => {
  delete req.session.user;
  res.json({ success: true });
})

app.all('/api/*', api());

app.get('*', setServerInfo, setVueContext, isProduction ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || (isProduction ? config.portProd : config.portDev);


app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
