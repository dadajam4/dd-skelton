<template>
  <dd-toolbar :class="classes">
    <slot />
  </dd-toolbar>
</template>



<script>



export default {
  name: publicSettings.css.suffix + 'app-header',

  props: {
    fixed: Boolean,
  },

  data() {
    return {
      // drawer: {
      //   left: false,
      //   right: false,
      // },
    }
  },

  computed: {
    classes() {
      return {
        [this.$options.name]: true,
        [`${this.$options.name}--fixed`]: this.fixed,
        [`${this.$options.name}--drawer-left-active`]: this.$store.getters[`${publicSettings.css.key}/drawer/left`],
        [`${this.$options.name}--drawer-right-active`]: this.$store.getters[`${publicSettings.css.key}/drawer/right`],
      }
    },
  },

  methods: {
  },

  created() {
  },

  beforeDestroy() {
  },
}
</script>