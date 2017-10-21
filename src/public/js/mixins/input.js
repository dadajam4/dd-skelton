import Validatable from './validatable';



export default {
  mixins: [Validatable],

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
    leftIcon: String,
    leftIconCb: Function,
    rightIcon: String,
    rightIconCb: Function,
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
        'vc@input-group--left-icon': this.leftIcon,
        'vc@input-group--right-icon': this.rightIcon,
        'vc@input-group--required': this.required,
        'vc@input-group--hide-details': this.hideDetails,
        'vc@input-group--placeholder': !!this.placeholder,
        'vc@input-group--left-btn': this.$slots.leftBtn,
        'vc@input-group--right-btn': this.$slots.rightBtn,
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
        && this.validations.length === 0
      ) {
        messages = [this.genHint()];
      } else if (this.validations.length) {
        messages = this.validations.filter(v => v).map(v => this.genError(v));
      }

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
      return this.$createElement('div', {
        class: 'vc@input-group__error',
        key: error,
      }, error);
    },

    genIcon(type) {
      const icon = this[`${type}Icon`];

      const callback = this[`${type}IconCb`];

      return this.$createElement('vn@-icon', {
        attrs: {
          'aria-hidden': true,
        },
        class: {
          [`vc@input-group__${type}-icon`]: true,
        },
        props: {
          disabled: this.disabled,
        },
        on: {
          click: e => {
            if (!callback) return;

            e.stopPropagation();
            callback();
          }
        }
      }, icon);
    },

    genInputGroup(input, data = {}/*, defaultAppendCallback = null*/) {
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

      const $inputWrapper = this.$createElement('div', {
        class: {
          'vc@input-group__input-wrapper': true,
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
      $body.children = [$inputWrapper, this.genSuggest(), $details];
      $inputWrapper.children = [$input];
      $input.children = [...input];

      ['left', 'right'].forEach(type => {
        if (this.$slots[`${type}Btn`]) {
          const $btn = this.$slots[`${type}Btn`][0];
          $btn.componentOptions.propsData[type] = true;
          $inputWrapper.children[type === 'left' ? 'unshift' : 'push']($btn);
        }
      });

      if (this.leftIcon) $input.children.unshift(this.genIcon('left'));
      if (this.rightIcon) $input.children.push(this.genIcon('right'));

      return $group;
    },
  }
}
