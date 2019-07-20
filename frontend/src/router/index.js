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
      if (to.meta && to.meta.scroll) {
        return {
          selector: '#lenta',
          offset: { x: 0, y: 100 }
        }
      }

      if (to.meta && to.meta.page && from.meta && !from.meta.modal)
        return { x: 0, y: 0 };
    },
    routes: [
      {
        path: '/',
        component: () => import('@/views/Main'),
        meta: {
          page: true,
        },
        children: [
          {
            path: '',
            name: 'index',
            component: () => import('@/views/IndexPage'),
            meta: {
              page: true,
            },
          },
        ],
      },
      {
        path: '/user/:id',
        name: 'user',
        component: () => import('@/views/User'),
        meta: {
          page: true,
        },
        children: [
          {
            path: 'albums',
            name: 'user-albums',
            component: () => import('@/views/components/User/Albums/Index'),
            meta: {
              modal: true,
            },
          },
          {
            path: 'albums/:album',
            name: 'user-album',
            component: () => import('@/views/components/User/Albums/Single'),
            meta: {
              modal: true,
            },
          },
          {
            path: 'photos/:photo',
            name: 'user-photo',
            component: () => import('@/views/components/User/Photos/Index'),
            meta: {
              modal: true,
            },
          },
          {
            path: 'videos',
            name: 'user-videos',
            component: () => import('@/views/components/User/Videos/Index'),
            meta: {
              modal: true,
            },
          },
          {
            path: 'videos/:video',
            name: 'user-video',
            component: () => import('@/views/components/User/Videos/Single'),
            meta: {
              modal: true,
            },
          },
          {
            path: 'rewards',
            name: 'user-rewards',
            component: () => import('@/views/components/User/Rewards/Index'),
            meta: {
              modal: true,
            },
          },
          {
            path: 'about',
            name: 'user-about',
            component: () => import('@/views/components/User/Content/Sportsman/About'),
            meta: {
              type: 'tabs',
            },
          },
          {
            path: 'goals',
            name: 'user-goals',
            component: () => import('@/views/components/User/Content/Sportsman/Goals'),
            meta: {
              type: 'tabs',
              scroll: true,
            },
          },
          {
            path: 'goals/:goal',
            name: 'user-goal',
            component: () => import('@/views/components/User/Content/Sportsman/Goals/SingleGoal'),
            meta: {
              type: 'tabs',
              scroll: true,
            },
          },
          {
            path: 'resume',
            name: 'user-resume',
            component: () => import('@/views/components/User/Content/Trener/Resume'),
            meta: {
              type: 'tabs',
            },
          },
          {
            path: 'lenta',
            name: 'user-lenta',
            component: () => import('@/views/components/User/Content/Trener/Lenta'),
            meta: {
              type: 'tabs',
              scroll: true,
            },
          },
          {
            path: 'videouroki',
            component: () => import('@/views/components/User/Content/Trener/Videouroki'),
            meta: {
              type: 'tabs',
              scroll: true,
            },
            children: [
              {
                path: '/',
                name: 'user-videouroki',
                component: () => import('@/views/components/User/Content/Trener/Videouroki/Index'),
                meta: {
                  type: 'tabs',
                  scroll: true,
                },
              },
              {
                path: 'kursi/:kurs',
                name: 'user-videokurs',
                component: () => import('@/views/components/User/Content/Trener/Videouroki/Videokurs/Index'),
                meta: {
                  type: 'tabs',
                  scroll: true,
                },
              },
              {
                path: ':urok',
                name: 'user-videourok',
                component: () => import('@/views/components/User/Content/Trener/Videouroki/Single'),
                meta: {
                  type: 'tabs',
                  scroll: true,
                },
              }
            ]
          },
          {
            path: 'uslugi',
            component: () => import('@/views/components/User/Content/Trener/Uslugi'),
            meta: {
              type: 'tabs',
              scroll: true,
            },
            children: [
              {
                path: '/',
                name: 'user-uslugi',
                component: () => import('@/views/components/User/Content/Trener/Uslugi/Index'),
                meta: {
                  type: 'tabs',
                  scroll: true,
                },
              },
            ]
          },
        ],
      },
      {
        path: '/treners',
        name: 'treners',
        component: () => import('@/views/Treners'),
        meta: {
          page: true,
        },
      },
      {
        path: '/bookmarks',
        name: 'bookmarks',
        component: () => import('@/views/Bookmarks'),
        meta: {
          page: true,
          requiredAuth: true,
        },
      },
      {
        path: '/im',
        name: 'messages',
        component: () => import('@/views/Im'),
        meta: {
          page: true,
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
