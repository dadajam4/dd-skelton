import Vue             from 'vue';
import App             from './App';
// import DDTappable      from 'dd-tappable';
// import DDWindowManager from 'dd-window-manager';
import browserDetect   from 'browser-detect';
// import ui                from './plugins/ui';



// Vue.use(ui);



const Root = Vue.extend({
  render: h => h(App),



  data() {
    return {
    }
  },



  computed: {
  },



  /**
   * constructor
   */
  created() {
    // this.tappable = new DDTappable({touchClassName: 'dd-touch'});
    // this.window   = new DDWindowManager();
    this.platform = browserDetect();
  },



  methods: {

    /**
     * Initialize
     */
    init() {
    },
  },
});



const root = new Root({el: '#app'});



export default root;
