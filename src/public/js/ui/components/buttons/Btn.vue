<template>
  <a
    :class="classes"
  >
    <slot />
  </a>
</template>



<script>



export default {
  props: {

    // color
    plain: Boolean,
    flat: Boolean,
    primary: Boolean,
    accent: Boolean,
    strong: Boolean,

    // size
    sm: Boolean,
    lg: Boolean,
    block: Boolean,
    blockPc: Boolean,
    blockSp: Boolean,

    // width
    widthLg: Boolean,
    widthLgPc: Boolean,
    widthLgSp: Boolean,

    // font size
    textLg: Boolean,

    // icon
    iconLeft: String,
    iconRight: String,
  },



  computed: {
    classes() {
      return {
        // 'dn-btn': true,
        // 'dn-btn--plain': this.plain,
        // 'dn-btn--flat': this.flat,
        // 'dn-btn--primary': this.primary,
        // 'dn-btn--accent': this.accent,
        // 'dn-btn--strong': this.strong,
        // 'dn-btn--disabled': this.linkIsDisabled,
        // 'dn-btn--sm': this.sm,
        // 'dn-btn--lg': this.lg,
        // 'dn-btn--block': this.block,
        // 'dn-btn--block-pc': this.blockPc,
        // 'dn-btn--block-sp': this.blockSp,
        // 'dn-btn--width-lg': this.widthLg,
        // 'dn-btn--width-lg-pc': this.widthLgPc,
        // 'dn-btn--width-lg-sp': this.widthLgSp,
        // 'dn-btn--text-lg': this.textLg,
        // 'dn-btn--has-icon': this.hasIcon,
      }
    },

    // flags
    hasIcon() { return (this.iconLeft !== undefined || this.iconRight !== undefined) },

    // values
    iconPosition() {
      if (this.iconLeft) return 'left';
      if (this.iconRight) return 'right';
    },
  },

  methods: {
  },
}
</script>