const APP_COMPONENT_NAME = 'vn@-app';



const appValues = {
  headerFixed      : false,
  leftDrawerActive : false,
  leftDrawerStatic : false,
  rightDrawerActive: false,
  rightDrawerStatic: false,
};



export default {
  data() {
    return Object.assign({
      // headerFixed      : false,
      // leftDrawerActive : false,
      // leftDrawerStatic : false,
      // rightDrawerActive: false,
      // rightDrawerStatic: false,
    }, appValues);
  },

  computed: {
    isApp() { return this.$options.name === APP_COMPONENT_NAME },

    $_app() { return this.$findParentByName(APP_COMPONENT_NAME) },
  },

  methods: {
    _initAppValues() {
      for (let key in appValues) {
        this[key] = this.$_app[key];
      }
    },

    _setupAppListeners() {
      this._onChangeHeaderFixed = fixed => {
        this.headerFixed = fixed;
      }

      this.$_app.$on('change-header-fixed', this._onChangeHeaderFixed);

      ['left', 'right'].forEach(position => {
        const activeFuncName = `_onChange${this.$dd.h.firstUpper(position)}DrawerActive`,
              staticFuncName = `_onChange${this.$dd.h.firstUpper(position)}DrawerStatic`;

        this[activeFuncName] = isActive => {
          this[`${position}DrawerActive`] = isActive;
        }

        this[staticFuncName] = isStatic => {
          this[`${position}DrawerStatic`] = isStatic;
        }

        this.$_app.$on(`change-drawer-${position}-active`, this[activeFuncName]);
        this.$_app.$on(`change-drawer-${position}-static`, this[staticFuncName]);
      });
    },

    _removeAppListeners() {
      if (this._onChangeHeaderFixed) this.$_app.$off('change-header-fixed', this._onChangeHeaderFixed);

      ['left', 'right'].forEach(position => {
        const activeFuncName = `_onChange${this.$dd.h.firstUpper(position)}DrawerActive`,
              staticFuncName = `_onChange${this.$dd.h.firstUpper(position)}DrawerStatic`;

        if (this.activeFuncName) this.$_app.$off(`change-drawer-${position}-active`, this[activeFuncName]);
        if (this.staticFuncName) this.$_app.$off(`change-drawer-${position}-static`, this[staticFuncName]);
      });
    },
  },

  created() {
    if (this.isApp) return;

    if (!this.$_app) throw new Error(`component '${this.$options.name}' needs '${APP_COMPONENT_NAME}' component.`);
    this._initAppValues();
    this._setupAppListeners();
  },

  beforeDestroy() {
    if (this.isApp) return;

    this._removeAppListeners();
  },
}
