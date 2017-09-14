<template>
  <nav :class="classes">
    <dd-overlay :class="`${this.$options.name}__overlay`" v-model="isActive" />
    <div
      :class="`${this.$options.name}__base`"
      v-click-outside="closeConditional"
    >
      <div :class="`${this.$options.name}__content`">
        <p>{{mq}}</p>

        <slot />
      </div>
    </div>
  </nav>
</template>



<script>
import ClickOutside from '../../directives/click-outside';
import Mq from '../../mixins/mq';



export default {
  name: publicSettings.css.suffix + 'navigation-drawer',

  directives: {
    ClickOutside,
  },

  mixins: [Mq],

  props: {
    value: { required: false },
  },



  data() {
    return {
      isActive: this.value,
    }
  },



  computed: {
    classes() {
      return {
        [this.$options.name]: true,
        [`${this.$options.name}--open`]: this.isActive,
        [`${this.$options.name}--close`]: !this.isActive,
      }
    },
  },

  watch: {
    isActive(val) {
      this.$emit('input', val);
      // this.$el.scrollTop = 0;
    },

    value(val) {
      if (this.permanent) return;
      if (val !== this.isActive) this.isActive = val;
    },
  },

  methods: {
    closeConditional() {
      return !this.permanent;
      // return !this.permanent && (this.temporary || this.isMobile)
    },

    show() {

    },
  },

  watch: {
    'mq.desktop'(val) {
      // this.isActive = val;
      // this.$emit('input', val);
    },
  },
}
</script>