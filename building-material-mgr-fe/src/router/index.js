import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),

  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "auth" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'main',
        name: 'Main',
        component: () => import(/* webpackChunkName: "main" */ '../views/Main/index.vue'),
      },
      {
        path: 'main/:id',
        name: 'mainDetail',
        component: () => import(/* webpackChunkName: "mainDetail" */ '../views/BookDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/Users/index.vue'),
      }


    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async(to,from,next)=>{
  if(!store.state.characterInfo.length){
   store.dispatch('getCharacterInfo');
  }
  
  store.dispatch('getUserInfo');
  next();
});

export default router;
