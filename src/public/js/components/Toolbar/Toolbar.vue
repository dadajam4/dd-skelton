<template>
  <nav :class="classes">
    <div :class="contentClasses">
      <slot />
    </div>
  </nav>
</template>



<script>



export default {
  name: publicSettings.css.prefix + 'toolbar',

  props: {
  },



  computed: {
    classes() {
      return {
        [this.$options.name]: true,
      }
    },
    contentClasses() {
      return {
        [`${publicSettings.css.prefix}toolbar__content`]: true,
      }
    },
  },

  methods: {
  },
}
</script>