import Vue from 'vue';
import store from './store';
import router from './router';
import mixin from './mixin';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.mixin(mixin);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
