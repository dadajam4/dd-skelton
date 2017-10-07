export default {
  props: {
    // appendIcon: String,
    // appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    // hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    // prependIcon: String,
    // prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0,
    },
    toggleKeys: {
      type: Array,
      default: () => [13, 32],
    },
    value: {
      required: false,
    },
  },

  data() {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value,
    }
  },

  computed: {
    inputGroupClasses() {
      return Object.assign({
        'vc@input-group': true,
        // 'vc@input-group--async-loading': this.loading !== false,
        'vc@input-group--focused': this.isFocused,
        // 'vc@input-group--dirty': this.isDirty,
        'vc@input-group--tab-focused': this.tabFocused,
        'vc@input-group--disabled': this.disabled,
        'vc@input-group--error': this.hasError,
        // 'vc@input-group--append-icon': this.appendIcon,
        // 'vc@input-group--prepend-icon': this.prependIcon,
        'vc@input-group--required': this.required,
        'vc@input-group--hide-details': this.hideDetails,
        'vc@input-group--placeholder': !!this.placeholder,
        // 'theme--dark': this.dark,
        // 'theme--light': this.light
      }, this.classes);
    },

    isDirty() {
      return !!this.inputValue;
    },
  },

  methods: {
    groupFocus(e) {},

    groupBlur(e) {
      this.tabFocused = false;
    },

    genLabel() {
      const _label = this.$slots.label || this.label;
      return this.$createElement(_label ? 'label' : 'div', {
        class: {
          'vc@input-group__label': true,
          'vc@input-group__label--empty': !_label,
        },
        on: {
          click: this.onClickLabel,
        },
      }, _label);
    },

    genMessages() {
      let messages = [];

      if (
        (this.hint && this.isFocused || this.hint && this.persistentHint)
        && true //this.validations.length === 0
      ) {
        messages = [this.genHint()];
      }
      // } else if (this.validations.length) {
      //   messages = this.validations.map(v => this.genError(v))
      // }

      return this.$createElement('transition-group', {
        class: {
          'vc@input-group__messages': true,
        },
        props: {
          tag: 'div',
          name: 'vc@transition-slide-y',
        }
      }, messages);
    },

    genHint() {
      return this.$createElement('div', {
        class: {
          'vc@input-group__label__hint': true,
        },
        key: this.hint,
        domProps: {innerHTML: this.hint},
      })
    },

    genError(error) {
    },

    // genIcon (type, defaultCallback = null) {
    //   const shouldClear = type === 'append' && this.clearable && this.isDirty
    //   const icon = shouldClear ? 'clear' : this[`${type}Icon`]
    //   const callback = shouldClear
    //     ? this.clearableCallback
    //     : (this[`${type}IconCb`] || defaultCallback)

    //   return this.$createElement('v-icon', {
    //     attrs: {
    //       'aria-hidden': true
    //     },
    //     'class': {
    //       [`input-group__${type}-icon`]: true,
    //       'input-group__icon-cb': !!callback,
    //       'input-group__icon-clearable': shouldClear
    //     },
    //     props: {
    //       disabled: this.disabled
    //     },
    //     on: {
    //       click: e => {
    //         if (!callback) return

    //         e.stopPropagation()
    //         callback()
    //       }
    //     }
    //   }, icon)
    // },

    genInputGroup($node, data = {}/*, defaultAppendCallback = null*/) {
      data = Object.assign({}, {
        class: this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled
            ? -1
            : this.internalTabIndex || this.tabindex,
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,

          click: () => (this.tabFocused = false),

          keyup: e => {
            if ([9, 16].includes(e.keyCode)) {
              this.tabFocused = true;
            }
          },

          keydown: e => {
            if (!this.toggle) return;

            if (this.toggleKeys.includes(e.keyCode)) {
              e.preventDefault();
              this.toggle();
            }
          }
        },
      }, data)

      const $group = this.$createElement('div', data);

      const $label = this.genLabel();

      const $body = this.$createElement('div', {
        class: {
          'vc@input-group__body': true,
        }
      });

      const $input = this.$createElement('div', {
        class: {
          'vc@input-group__input': true,
        }
      });

      const $details = this.$createElement('div', {
        class: {
          'vc@input-group__details': true,
        }
      });

      $details.children = [this.genMessages()];

      if (this.counter) $details.children.push(this.genCounter());

      $group.children = [$label, $body];
      $body.children = [$input, $details];
      $input.children = [$node];

      return $group;
    },
  }
}
