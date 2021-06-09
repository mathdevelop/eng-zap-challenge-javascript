import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Catalog from '../views/Catalog.vue';
import Product from '../views/Product.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'catalog',
            path: '/catalog/:id/:page?',
            component: Catalog
        },
        {
            name: 'product',
            path: '/product/:id',
            component: Product
        }
    ]
});

export default router;