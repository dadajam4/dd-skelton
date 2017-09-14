<template>
  <nav :class="classes">
    <div :class="`${$ui.cssSuffix}toolbar__content`">
      <slot />
    </div>
  </nav>
</template>



<script>



export default {
  name: publicSettings.css.suffix + 'toolbar',

  props: {
  },



  computed: {
    classes() {
      return {
        [this.$options.name]: true,
      }
    },
  },

  methods: {
  },
}
</script>