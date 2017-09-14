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

      hasHeader: false,
      headerFixed: false,
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

    leftDrawerActive() { return this.$store.getters[`${publicSettings.css.key}/drawer/left`] },
    leftDrawerStaticed() { return this.$store.getters[`${publicSettings.css.key}/drawer/leftstatic`] },
    rightDrawerActive() { return this.$store.getters[`${publicSettings.css.key}/drawer/right`] },
    rightDrawerStaticed() { return this.$store.getters[`${publicSettings.css.key}/drawer/rightstatic`] },
  },

  methods: {
  },

  created() {
  },

  beforeDestroy() {
  },

  render(h) {
    const children = this.$slots.default,
          header   = children.find(child => child.componentOptions && child.componentOptions.tag === 'dd-app-header');

    this.hasHeader = header !== undefined;
    if (this.hasHeader) {
      this.headerFixed = header.componentOptions.propsData.fixed !== undefined;
    }

    return h('div', {
      'class': this.classes,
      attrs: {
        id: this.id,
        'data-app': '',
      },
    }, children);
  },
}
