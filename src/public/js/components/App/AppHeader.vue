<template>
  <vn@-toolbar :class="classes">
    <slot />
  </vn@-toolbar>
</template>



<script>
import appMixin from '../../mixins/app';



export default {
  name: 'vn@-app-header',

  mixins: [appMixin],

  props: {
    fixed: Boolean,
  },

  data() {
    return {
    }
  },

  computed: {
    classes() {
      return {
        [this.$options.name]: true,
        [`${this.$options.name}--fixed`]: this.fixed,
        [`${this.$options.name}--drawer-left-active`]: this.leftDrawerActive,
        [`${this.$options.name}--drawer-right-active`]: this.rightDrawerActive,
      }
    },
  },

  watch: {
    fixed() {
      this.updateAppState();
    },
  },

  methods: {
    updateAppState() {
      this.$_app.headerFixed = this.fixed;
    },

    clearAppState() {
      this.$_app.headerFixed = false;
    },
  },

  created() {
    this.$_app.uses.header = true;
    this.updateAppState();
  },

  beforeDestroy() {
    this.clearAppState();
  },

  destroyed() {
    this.$_app.uses.header = false;
  },
}
</script>