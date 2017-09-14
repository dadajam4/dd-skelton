export default {
  name: publicSettings.css.suffix + 'app',

  props: {
    id: {
      type   : String,
      default: 'app'
    },
  },


  data() {
    return {
    }
  },

  computed: {
    classes() {
      return {
        [this.$options.name]: true,
        [`${this.$options.name}--header-fixed`]: this.headerFixed,
        [`${this.$options.name}--drawer-left-active`]: this.leftDrawerActive,
        [`${this.$options.name}--drawer-right-active`]: this.rightDrawerActive,
        [`${this.$options.name}--drawer-left-staticed`]: this.leftDrawerStaticed,
        [`${this.$options.name}--drawer-right-staticed`]: this.rightDrawerStaticed,
      }
    },

    headerFixed() { return this.$store.getters[`${publicSettings.css.key}/header/fixed`] },
    leftDrawerActive() { return this.$store.getters[`${publicSettings.css.key}/drawer/left`] },
    leftDrawerStaticed() { return this.leftDrawerActive && this.$store.getters[`${publicSettings.css.key}/drawer/leftstatic`] },
    rightDrawerActive() { return this.$store.getters[`${publicSettings.css.key}/drawer/right`] },
    rightDrawerStaticed() { return this.rightDrawerActive && this.$store.getters[`${publicSettings.css.key}/drawer/rightstatic`] },
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
