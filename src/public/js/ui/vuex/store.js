import Vue    from 'vue';
import Vuex   from 'vuex';
import mq     from './modules/mq';
import drawer from './modules/drawer';



Vue.use(Vuex);



const store = new Vuex.Store({
  modules: {
    [publicSettings.css.key]: {
      namespaced: true,

      modules: {
        mq,
        drawer,
      },
    },
  },
  strict: IS_DEVELOP,
});



store.dispatch(`${publicSettings.css.key}/mq/run`);



export default store;