<template>
  <nav :class="classes">
    <dd-overlay :class="`${this.$options.name}__overlay`" v-model="isActive" />
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
import Mq from '../../mixins/mq';
import ClickOutside from '../../directives/click-outside';



export default {
  name: publicSettings.css.suffix + 'app-drawer',

  mixins: [Mq],

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
      get() { return this.$store.getters[`${publicSettings.css.key}/drawer/${this.vec}`] },
      set(val) { this.$store.dispatch(`${publicSettings.css.key}/drawer/set${this.vec}`, val) },
    },

    isStatic: {
      get() { return this.$store.getters[`${publicSettings.css.key}/drawer/${this.vec}static`] },
      set(val) { this.$store.dispatch(`${publicSettings.css.key}/drawer/set${this.vec}static`, val) },
    },
  },

  watch: {
    value(val) {
      this.isActive = val;
    },

    isActive(val) {
      this.$store.dispatch(`${publicSettings.css.key}/drawer/set${this.vec}`, val);
      this.$emit('input', val);
    },

  },

  methods: {
    closeConditional() {
      return !this.permanent && !this.isStatic;
    },

    checkStatic() {
      this.isStatic = this.$store.getters[`${publicSettings.css.key}/mq/${this.static}`];
      this.$store.dispatch(`${publicSettings.css.key}/drawer/set${this.vec}`, this.isStatic);
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

  // render(h) {
  //   const children = [
  //     h('dd-overlay', {
  //       class: `${this.$options.name}__overlay`,
  //       // domProps: {
  //       //   value: this.isActive,
  //       // },
  //       props: {
  //         value: this.isActive,
  //       },
  //       on: {
  //         input: value => {
  //           this.isActive = value;
  //           // this.$emit('input', e.target.value)
  //         },
  //       },
  //     }),
  //     h('div', {
  //       class: `${this.$options.name}__base`,
  //       directives: [
  //         {
  //           name: 'click-outside',
  //           value: this.closeConditional,
  //         }
  //       ],
  //     }, [
  //       h('div', {
  //         class: `${this.$options.name}__content`,
  //       }, this.$slots.default)
  //     ])
  //   ];

  //   // ["tag", "data", "children", "text", "elm", "ns", "context", "functionalContext", "key", "componentOptions", "componentInstance", "parent", "raw", "isStatic", "isRootInsert", "isComment", "isCloned", "isOnce"]
  //   // console.warn(this.$slots.default[0].componentOptions);

  //   return h('nav', {
  //     class: this.classes,
  //   }, children);
  // },
}
</script>