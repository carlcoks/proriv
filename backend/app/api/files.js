const path = require('path'),
      fs = require('fs');

const api = {};

const pathDir = '../../public/users';

api.getFileUser = () => (req, res) => {

  let pathEnd;

  if (req.url.indexOf('/api/public/img') > -1) {

    const url = req.url.replace('/api', '');
    pathEnd = path.resolve(__dirname, `../../${url}`);

  } else if (req.url.indexOf('/api/public/albums') > -1) {

    const url = req.url.replace('/api', '');
    pathEnd = path.resolve(__dirname, `../../${url}`);

  } else if (req.url.indexOf('/api/public/rewards') > -1) {

    const url = req.url.replace('/api', '');
    pathEnd = path.resolve(__dirname, `../../${url}`);

  } else if (req.url.indexOf('/api/public/lenta') > -1) {

    const url = req.url.replace('/api', '');
    pathEnd = path.resolve(__dirname, `../../${url}`);

  } else {

    const url = req.url.split('/');
    const fileName = url.pop();
    const userId = url.pop();

    pathEnd = path.resolve(__dirname, pathDir+'/'+userId+'/'+fileName);

  }

    if (fs.existsSync(pathEnd) && fs.lstatSync(pathEnd).isFile()) {
      res.sendFile(pathEnd);
    } else {
      res.status(404).send('Not Found')
    }

}

module.exports = api;
