import Vue from 'vue';
import VueCookie from 'vue-cookie';
import MaskedInput from 'vue-masked-input';

import VueSocket from 'vue-socket.io';

import 'babel-polyfill';
Vue.use(VueCookie);
Vue.component('MaskedInput', MaskedInput)

import 'swiper/dist/css/swiper.css';
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
  Vue.use(VueAwesomeSwiper);
}

const isProduction = process.env.NODE_ENV === 'production';

const socketPort = '3001';
const pathForSocket = isProduction ? `${window.location.protocol}${window.location.hostname}:${socketPort}` : `http://localhost:${socketPort}`;
Vue.use(VueSocket, pathForSocket, store);

import { vueTopprogress } from 'vue-top-progress';
import { createApp } from './main';
import { createAsyncDataGuard } from './router/guards';

  const progressBar = new Vue({
    ...vueTopprogress,
    propsData: { color: 'red', height: 2 },
  }).$mount();

  const state = window.__INITIAL_STATE__;
  const { app, router, store } = createApp({ state });

  router.onReady(() => {
    router.beforeResolve(createAsyncDataGuard(store, router, progressBar));
    document.body.appendChild(progressBar.$el);
    app.$mount('#app');
  });
