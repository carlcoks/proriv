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

      if (to.meta && to.meta.page && from.meta && !from.meta.modal)
        return { x: 0, y: 0 };
    },
    routes: [
      {
        path: '/',
        component: () => import('@/views/Main'),
        meta: {
          requiredAuth: true,
        },
        children: [
          {
            path: '',
            name: 'index',
            component: () => import('@/views/IndexPage'),
            meta: {
              requiredAuth: true,
            },
          },
        ],
      },
      {
        path: '/download',
        name: 'download',
        component: () => import('@/views/Download'),
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: '/analytics',
        name: 'analytics',
        component: () => import('@/views/Analytics'),
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginPage'),
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
        next('/login')
      }

    } else next()
  })

  return router;
}
