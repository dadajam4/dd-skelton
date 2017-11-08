export default {
  props: {
    theme: {
      type: String,
    },
  },

  computed: {
    themeClasses() {
      return this.theme ? {
        [`vc@theme--${this.theme}`]: true,
      } : {};
    }
  }
}