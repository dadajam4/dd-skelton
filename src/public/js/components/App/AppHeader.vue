<template>
  <dd-toolbar :class="classes">
    <slot />
  </dd-toolbar>
</template>



<script>
import appMixin from '../../mixins/app';



export default {
  name: publicSettings.css.prefix + 'app-header',

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
  },

  created() {
    this.updateAppState();
  },

  beforeDestroy() {
  },
}
</script>