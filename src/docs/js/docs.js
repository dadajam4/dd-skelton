// import store     from 'vuex/store';
import App       from './App';
import VueRouter from 'vue-router';
import routings  from '.tmp/docs-routings';



const router = new VueRouter(routings);



const docsSettings = {
  router,
  // store,

  components: {
  },

  created() {
    // Object.defineProperty(this, 'h', {
    //   get() { return this.helpers }
    // });

    // new EventManager(this);
  },



  methods: {
    async init() {

      // await this.$store.dispatch('config/init');

      // this.emit('init');
    },
  },



  data() {
    return {
    }
  },


  async mounted() {
  },

  computed: {
  },


  render: h => h(App),
};



export default docsSettings;