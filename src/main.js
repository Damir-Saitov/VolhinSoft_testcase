import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Dragula from 'vue-dragula'

import index from './page/index.vue'
import board from './page/board.vue'

Vue.use(Router);
Vue.use(Dragula);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/board/:id',
            name: 'board',
            component: board,
            props: true
        }
    ],
    mode: 'history'
});

new Vue({
    el: '#app',
    render: h => h(App),
    router
});
