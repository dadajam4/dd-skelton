<template>
  <nav :class="classes">
    <vn@-overlay :class="`${this.$options.name}__overlay`" v-model="isActive" />
    <div
      :class="`${this.$options.name}__base`"
      v-click-outside="closeConditional"
    >
      <div :class="`${this.$options.name}__content`">
        <slot />
      </div>
    </div>
  </nav>
</template>



<script>
import appMixin from '../../mixins/app';
import Mq from '../../mixins/mq';
import ClickOutside from '../../directives/click-outside';



export default {
  name: 'vn@-app-drawer',

  mixins: [appMixin, Mq],

  directives: {
    ClickOutside,
  },

  props: {
    value: {
      required: false,
    },
    left: Boolean,
    right: Boolean,
    static: {
      type: String,
      default: null,
    },
  },



  data() {
    return {
      lastRequested: null,
    }
  },



  computed: {
    classes() {
      return {
        [this.$options.name]: true,
        [`${this.$options.name}--left`]: this.left,
        [`${this.$options.name}--right`]: this.right,
        [`${this.$options.name}--open`]: this.isActive,
        [`${this.$options.name}--close`]: !this.isActive,
        [`${this.$options.name}--static`]: this.isStatic,
      }
    },
    vec() { return this.left ? 'left' : 'right' },

    isActive: {
      get() { return this[`${this.vec}DrawerActive`] },
      set(val) { this.$_app[`${this.vec}DrawerActive`] = val },
    },

    isStatic: {
      get() { return this[`${this.vec}DrawerStatic`] },
      set(val) { this.$_app[`${this.vec}DrawerStatic`] = val },
    },
  },

  watch: {
    value(val) {
      this.isActive = val;
    },

    isActive(isActive) {
      this.$emit('input', isActive);
    },

    isStatic(isStatic) {
      if (this.isStatic) {
        if (this.lastRequested || this.lastRequested === null) {
          this.isActive = true;
        }
      } else {
        this.isActive = false;
      }
    },

    $route() {
      if (!this.isStatic) this.isActive = false;
    },
  },

  methods: {
    closeConditional() {
      return !this.permanent && !this.isStatic;
    },

    checkStatic() {
      this.isStatic = this.mq[this.static];
    },
  },

  created() {
    this.$emit('input', this.isActive);

    if (this.static) {
      this.checkStatic();

      this.unWatchMq = this.$watch(`mq.${this.static}`, val => {
        this.checkStatic();
      });
    }
  },

  beforeDestroy() {
    if (this.unWatchMq) this.unWatchMq();
  },
}
</script>