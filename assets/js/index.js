import './core/polyfill';
import Vue       from 'vue';
import Vuex      from 'vuex';
import VueRouter from 'vue-router';
import VueHead   from 'vue-head';
import Ui        from '../ui';
import app       from './root';



Vue.use(VueHead);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Ui);



window.app = new Vue(app);
window.app.$mount('#app');
