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
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "log" */ '../views/Log/index.vue'),
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
  const reqArr = [];

  if(!store.state.characterInfo.length){
    reqArr.push(store.dispatch('getCharacterInfo'));
  }
  if(!store.state.characterInfo.account){
    reqArr.push(store.dispatch('getUserInfo'));

  }

  await Promise.all(reqArr);
  
  next();
});

export default router;
