import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default {};

export function createRouter(store) {
  const router = new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }

      // return { x: 0, y: 0 };
    },
    routes: [
      {
        path: '/',
        component: () => import('@/views/Main'),
        children: [
          {
            path: '',
            name: 'index',
            component: () => import('@/views/IndexPage'),
          },
        ],
      },
      {
        path: '/user/:id',
        name: 'user',
        component: () => import('@/views/User'),
        children: [
          {
            path: 'albums',
            name: 'user-albums',
            component: () => import('@/views/components/User/Albums/Index'),
          },
          {
            path: 'albums/:album',
            name: 'user-album',
            component: () => import('@/views/components/User/Albums/Single'),
          },
          {
            path: 'photos/:photo',
            name: 'user-photo',
            component: () => import('@/views/components/User/Photos/Index'),
          },
          {
            path: 'rewards',
            name: 'user-rewards',
            component: () => import('@/views/components/User/Rewards/Index'),
          }
        ],
      },
      {
        path: '/im',
        name: 'messages',
        component: () => import('@/views/Im'),
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/NotFound'),
      },
      {
        path: '*',
        redirect: '/404'
      }
    ],
  });

  router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth) {

      if (store.state.user.user.auth) {
        next();
      } else {
        next('/')
      }

    } else next()
  })

  return router;
}
