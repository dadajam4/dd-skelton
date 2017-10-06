<script>

export default {
  name: publicSettings.css.prefix + 'text-field',

  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    autofocus: Boolean,
    multiLine: Boolean,
    placeholder: String,
    disabled: Boolean,
    label: String,
    hint: String,
    persistentHint: Boolean,
    rows: {
      default: 5,
    },
    type: {
      type: String,
      default: 'text',
    },
    prefix: String,
    suffix: String,
    sm: Boolean,
    md: Boolean,
  },


  data() {
    return {
      isFocused: false,
    }
  },

  computed: {
    classes() {
      return {
        [this.$options.name]: true,

        [`${this.$options.name}--multi-line`]: this.multiLine,
        [`${this.$options.name}--sm`]: this.sm,
        [`${this.$options.name}--lg`]: this.lg,
        [`${this.$options.name}--suffix`]: this.suffix,
        [`${this.$options.name}--prefix`]: this.prefix,
        [`${this.$options.name}--focused`]: this.isFocused,
      }
    },

    inputClasses() {
      return {
        [`${this.$options.name}--input`]: true,
      }
    },

    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        // this.lazyValue = val
        this.$emit('input', val);
      }
    },
  },



  methods: {
    onInput(e) {
      this.inputValue = e.target.value;
      // this.badInput = e.target.validity && e.target.validity.badInput
      // this.shouldAutoGrow && this.calculateInputHeight()
    },
    onClickLabel(e) {
      return this.focus();
    },
    blur(e) {
      this.isFocused = false;
      // this.$nextTick(() => {
      //   this.validate()
      // })
      this.$emit('blur', e);
    },
    focus(e) {
      this.isFocused = true;
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus();
      }
      this.$emit('focus', e);
    },

    genHint() {
      return this.$createElement('div', {
        class: {
          [`${this.$options.name}__hint`]: true,
        },
        key: this.hint,
        domProps: {innerHTML: this.hint},
      })
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
          [`${this.$options.name}__messages`]: true,
        },
        props: {
          tag: 'div',
          name: `${publicSettings.css.prefix}transition-slide-y`,
        }
      }, messages);
    },
  },

  render(h) {
    const $group = h('div', {
      class: this.classes,
    });

    const $label = h(this.label ? 'label' : 'div', {
      class: {
        [`${this.$options.name}__label`]: true,
        [`${this.$options.name}__label--empty`]: !this.label,
      },
      on: {
        click: this.onClickLabel,
      },
    }, this.label);

    const $body = h('div', {
      class: {
        [`${this.$options.name}__body`]: true,
      }
    });

    const $input = h('div', {
      class: {
        [`${this.$options.name}__input`]: true,
      }
    });

    const nodeTag = this.multiLine ? 'textarea' : 'input';
    const listeners = this.$listeners || {};
    delete listeners['change']; // Change should not be bound externally

    const nodeOptions = {
      class: {
        [`${this.$options.name}__node`]: true,
      },
      domProps: {
        autofocus  : this.autofocus,
        disabled   : this.disabled,
        required   : this.required,
        value      : this.value,
      },
      attrs: {
        ...this.$attrs,
        readonly: this.readonly,
        tabindex: this.tabindex,
        'aria-label': (!this.$attrs || !this.$attrs.id) && this.label, // Label `for` will be set if we have an id
      },
      on: Object.assign({}, listeners, {
        blur: this.blur,
        input: this.onInput,
        focus: this.focus,
      }),
      ref: 'input',
    };

    if (this.multiLine) {
      nodeOptions.domProps.rows = this.rows;
    } else {
      nodeOptions.domProps.type = this.type;
    }

    if (this.placeholder) {
      nodeOptions.domProps.placeholder = this.placeholder;
    }

    const $node = h(nodeTag, nodeOptions);

    const $detail = h('div', {
      class: {
        [`${this.$options.name}__detail`]: true,
      }
    });

    $detail.children = [this.genMessages()];

    $group.children = [$label, $body];
    $body.children = [$input, $detail];
    $input.children = [$node];

    return $group;
  },
}
</script>