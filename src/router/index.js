import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Favorites from '../views/Favorites.vue';
import Detail from '../views/Detail.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,

    },
    {
        path: '/:s?:type?:y?:page?',
        name: 'Home',
        component: Home,

    },
    {
        path: '/movie/:movieId',
        name: 'DetailPage',
        component: Detail,

    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
