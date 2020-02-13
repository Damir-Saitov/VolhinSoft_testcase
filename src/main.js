import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';

import vuetify from './plugins/vuetify';
import {store} from '../store/index';

import index from './pages/index';
import board from './pages/board';
import e404 from './pages/e404';

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            alias: '/board',
            name: 'index',
            component: index,
        },
        {
            path: '/board/:id',
            name: 'board',
            component: board,
            props: true,
        },
        {
            path: '*',
            component: e404,
        }
    ],
    mode: 'history'
});

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    vuetify
});
