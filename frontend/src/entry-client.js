import Vue from 'vue';
import VueCookie from 'vue-cookie';
import MaskedInput from 'vue-masked-input';
import SmoothScrollbar from 'vue-smooth-scrollbar';

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
Vue.use(SmoothScrollbar, {
  alwaysShowTracks: true
});

import { vueTopprogress } from 'vue-top-progress';
import { createApp } from './main';
import { createAsyncDataGuard } from './router/guards';

  const progressBar = new Vue({
    ...vueTopprogress,
    propsData: { color: 'red', height: 2 },
  }).$mount();

  const state = window.__INITIAL_STATE__;

  Vue.mixin({
    async beforeRouteUpdate(to, from, next) {

      const routeComponents = [
        this.$options,
      ]

      const childComponents = []
      const cachedKeys = []

      const componentRecursion = (component, key) => {

        if (cachedKeys.indexOf(key) !== -1)
          return

        if (routeComponents.indexOf(component) === -1)
          childComponents.push(component)

        cachedKeys.push(key)

        if (component.components) {

          Object.keys(component.components).forEach(key => {
            componentRecursion(component.components[key], key)
          })
        }
      }

      routeComponents.forEach(component => componentRecursion(
        component,
        component.name
      ))

      // initial mutations (routes)
      const routeInitialMutations = routeComponents.map(
        component => component.initialMutations
      ).filter(
        mutations => Array.isArray(mutations)
      )

      // invoke initial mutations (routes)
      routeInitialMutations.forEach(
        mutations => mutations.forEach(
          mutation => this.$store.commit(mutation)
        )
      )

      // async data hooks (routes)
      const routeAsyncDataHooks = routeComponents.map(
        component => component.asyncData
      ).filter(
        callable => typeof callable === 'function'
      )

      // // show preloading
      // preloader.className = 'global-preloader_displayed'

      // async data promises (routes)
      const routeAsyncDataPromises = routeAsyncDataHooks.map(
        callable => callable({
          store: this.$store,
          route: to,
        })
      )

      // waiting (routes)
      await Promise.all(routeAsyncDataPromises)

      // initial mutations (children)
      const childInitialMutations = childComponents.map(
        component => component.initialMutations
      ).filter(
        mutations => Array.isArray(mutations)
      )

      // invoke initial mutations (children)
      childInitialMutations.forEach(
        mutations => mutations.forEach(
          mutation => this.$store.commit(mutation)
        )
      )

      // async data hooks (children)
      const childAsyncDataHooks = childComponents.map(
        component => component.asyncData
      ).filter(
        callable => typeof callable === 'function'
      )

      // async data promises (children)
      const childAsyncDataPromises = childAsyncDataHooks.map(
        callable => callable({
          store: this.$store,
          route: to,
        })
      )

      // waiting (children)
      await Promise.all(childAsyncDataPromises)

      // // hide preloading
      // preloader.className = 'global-preloader'

      // continue
      next()
    },
  })

  const { app, router, store } = createApp({ state });

  router.onReady(() => {
    router.beforeResolve(createAsyncDataGuard(store, router, progressBar));
    document.body.appendChild(progressBar.$el);
    app.$mount('#app');
  });
