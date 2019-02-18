import TabFocusable from '../../mixins/tab-focusable';
import Colorable from '../../mixins/colorable';



export default {
  name: 'vn@-radio',

  inheritAttrs: false,

  inject: ['isMandatory', 'name', 'registerChild', 'unregisterChild'],

  mixins: [Colorable, TabFocusable],

  props: {
    disabled: Boolean,
    value: null,
    label: String,
  },

  data() {
    return {
      defaultColor: 'accent',
      isActive: false,
    }
  },

  computed: {
    classes() {
      return this.addTextColorClassChecks({
        'vc@input-group': true,
        'vc@input-group--active': this.isActive,
        'vc@input-group--disabled': this.disabled,
        'vc@input-group--selection-controls': true,
        'vc@input-group--tab-focused': this.tabFocused,
        'vc@radio': true,
        // 'vc@theme--dark': this.dark,
        // 'vc@theme--light': this.light
      })
    },
  },

  methods: {
    genInput() {
      const radio = [];
      const value = ['string', 'number'].includes(typeof this.value)
        ? this.value
        : JSON.stringify(this.value);

      const $input = this.$createElement('input', {
        staticClass: 'vc@radio__node vc@input-group__selection-node',
        domProps: {
          type    : 'radio',
          checked : this.isActive,
          disabled: this.disabled,
        },

        attrs: {
          ...this.$attrs,
          readonly: this.readonly,
          tabindex: -1,
          name    : this.name && this.name(),
          id      : this.id,
          value,
        },

        ref: 'input',
      });

      const $faux = this.$createElement('i', {
        staticClass: 'vc@radio__faux vc@input-group__selection-faux',
        on: {
          click: e => {
            this.toggle();
          },
        },
      });

      $faux.children = [
        this.$createElement('span', {
          staticClass: 'vc@radio__faux__body',
        }),
      ];

      radio.push($input, $faux);

      return this.$createElement('div', {
        class: 'vc@input-group__input',
      }, radio)

    },

    genLabel() {
      return this.$createElement('label', {
        staticClass: 'vc@input-group__selection-label',
        on: {
          click: this.toggle,
        },
        attrs: {
          for: this.id,
        },
      }, this.$slots.label || this.label);
    },

    toggle() {
      const mandatory = this.isMandatory &&
        this.isMandatory() || false;

      if (!this.disabled && (!this.isActive || !mandatory)) {
        this.$refs.input.checked = true;
        this.isActive = true;
        this.$emit('change', this.value);
      }
    },
  },

  created() {
    // Semantic check to help people identify the reason for the inject error above it.
    if (!this.$parent || !this.$parent.$vnode || !this.$parent.$vnode.tag ||
      !this.$parent.$vnode.tag.endsWith('vn@-radio-group')) {
      console.warn('[dd-skelton] Warn: The vn@-radio component must have an immediate parent of vn@-radio-group.');
    }
  },

  mounted() {
    this.registerChild(this);
  },

  beforeDestroy() {
    this.unregisterChild(this);
  },

  render(h) {
    const children = [];

    children.push(this.genInput());
    children.push(this.genLabel());

    return h('div', {
      class: this.classes,
      attrs: {
        role: 'radio',
        'aria-checked': this.isActive && 'true' || 'false',
        'aria-label'  : this.label
      },
      on: {
        keydown: e => {
          if ([13, 32].includes(e.keyCode)) {
            e.preventDefault();
            this.toggle();
          }
        },
        keyup: e => {
          if ([9, 16].includes(e.keyCode)) {
            this.tabFocused = true;
          }
        },
        blur: e => {
          this.$emit('blur', e);
          this.tabFocused = false;
        },
      }
    }, children);
  }
}