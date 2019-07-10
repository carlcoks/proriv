import Vue from 'vue';
import { createApp } from './main';

const isDev = process.env.NODE_ENV !== 'production';
const urlPrefix = isDev ? '' : '';

export default context => new Promise((resolve, reject) => {
  const s = isDev && Date.now();
  const { app, router, store } = createApp(context);

  const { url, user } = context;
  const normalUrl = isDev ? url
    : url.replace(urlPrefix, '');

  let { fullPath } = router.resolve(normalUrl).route;
  fullPath = isDev ? fullPath : urlPrefix + fullPath;

  context.meta = app.$meta();

  if (fullPath !== url) {
    return reject({ url: fullPath });
  }

  if (user) {
    let state = store.state;
    const { auth, profile, token, user_id } = user;
    state.user.user = {auth, profile, token, user_id, errorAuth: '', errorSignup: ''};
    store.dispatch('user/getUser', { user_id })
    store.replaceState(state);
  }

  router.push(isDev ? url : normalUrl);

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }

    Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
      store,
      route: router.currentRoute,
    }))).then(() => {
      if (isDev) console.log(`data pre-fetch: ${Date.now() - s}ms`);
    }).catch(error => {
      console.log('Catch response error and set to app error view');
      return false;
    }).then(() => {
      context.state = store.state;
      resolve(app);
    });
  }, reject);
});
