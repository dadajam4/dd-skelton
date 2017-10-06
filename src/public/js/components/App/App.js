import appMixin from '../../mixins/app';



export default {
  name: 'vn@-app',

  mixins: [appMixin],

  props: {
    id: {
      type   : String,
      default: 'app'
    },
  },


  data() {
    return {}
  },

  computed: {
    classes() {
      return {
        [this.$options.name]: true,
        [`${this.$options.name}--header-fixed`]: this.headerFixed,
        [`${this.$options.name}--drawer-left-active`]: this.leftDrawerActive,
        [`${this.$options.name}--drawer-right-active`]: this.rightDrawerActive,
        [`${this.$options.name}--drawer-left-static`]: this.leftDrawerActive && this.leftDrawerStatic,
        [`${this.$options.name}--drawer-right-static`]: this.rightDrawerActive && this.rightDrawerStatic,
      }
    },
  },

  watch: {
    headerFixed() {
      this.$emit('change-header-fixed', this.headerFixed);
    },

    leftDrawerActive() {
      this.$emit('change-drawer-left-active', this.leftDrawerActive);
    },

    rightDrawerActive() {
      this.$emit('change-drawer-right-active', this.leftDrawerActive);
    },

    leftDrawerStatic() {
      this.$emit('change-drawer-left-static', this.leftDrawerStatic);
    },

    rightDrawerStatic() {
      this.$emit('change-drawer-right-static', this.rightDrawerStatic);
    },
  },

  methods: {
  },

  created() {
  },

  beforeDestroy() {
  },

  render(h) {
    return h('div', {
      'class': this.classes,
      attrs: {
        id: this.id,
        'data-app': '',
      },
    }, this.$slots.default);
  },
}
