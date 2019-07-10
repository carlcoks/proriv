import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import Meta from 'vue-meta';

import App from './App';
import { createRouter } from './router';
import { createStore } from './store';

import './extensions/object'

import { emoji } from './utils/emoji.js'
Vue.prototype.$emoji = emoji; // Глобальная переменная для создания img эмоции

Vue.config.productionTip = false;

Vue.use(Meta);

export function createApp(context) {
  const store = createStore(context);
  const router = createRouter(store);

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
