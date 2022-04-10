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
      },
      {
        path: 'rest/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '../views/ResetPassword/index.vue'),
      },
      {
        path: 'invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path: 'classify',
        name: 'Classify',
        component: () => import(/* webpackChunkName: "Classify" */ '../views/Classify/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
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
    await store.dispatch('getCharacterInfo');
  }

  const reqArr = [];

  if(!store.state.userInfo.account){
    reqArr.push(store.dispatch('getUserInfo'));

  }

  if(!store.state.classify.length){

    reqArr.push(store.dispatch('getClassify'));
  }

  await Promise.all(reqArr)
  // await Promise.all(reqArr);
  next();
});

export default router;
