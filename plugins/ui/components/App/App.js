import appMixin  from '../../mixins/app';
import Themeable from '../../mixins/themeable';



export default {
  name: 'vn@-app',

  mixins: [appMixin, Themeable],

  props: {
    id: {
      type   : String,
      default: 'app'
    },
  },


  data() {
    return {
      uses: {
        header: false,
        leftDrawer: false,
        rightDrawer: false,
      },
    }
  },

  computed: {
    transitionPropNames() {
      const names = [];
      this.uses.header && this.headerFixed && names.push('top');
      this.uses.leftDrawer && names.push('left');
      this.uses.rightDrawer && names.push('right');
      return names;
    },

    classes() {
      return Object.assign({
        [this.$options.name]: true,
        [`${this.$options.name}--has-header`]: this.uses.header,
        [`${this.$options.name}--has-drawer-left`]: this.uses.leftDrawer,
        [`${this.$options.name}--has-drawer-right`]: this.uses.rightDrawer,
        [`${this.$options.name}--transition-${this.transitionPropNames.join('-')}`]: this.transitionPropNames.length,
        [`${this.$options.name}--header-fixed`]: this.headerFixed,
        [`${this.$options.name}--drawer-left-active`]: this.leftDrawerActive,
        [`${this.$options.name}--drawer-right-active`]: this.rightDrawerActive,
        [`${this.$options.name}--drawer-left-static`]: this.leftDrawerActive && this.leftDrawerStatic,
        [`${this.$options.name}--drawer-right-static`]: this.rightDrawerActive && this.rightDrawerStatic,
      }, this.themeClasses)
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
