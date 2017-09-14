import 'public/js/core/polyfill';
import Vue       from 'vue';
import Vuex      from 'vuex';
import VueRouter from 'vue-router';
import VueHead   from 'vue-head';
import Ui        from 'public/js/ui';
import docs      from './docs';



Vue.use(VueHead);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Ui);



window.docs = new Vue(docs);
window.docs.$mount('#app');
