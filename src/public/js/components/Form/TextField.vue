<script>
import inputMixin from '../../mixins/input';



export default {
  name: 'vn@-text-field',

  mixins: [inputMixin],

  props: {
    autofocus: Boolean,

    rows: {
      default: 5,
    },

    type: {
      type: String,
      default: 'text',
    },

    counter: [Boolean, Number, String],
    prefix: String,
    suffix: String,
    sm: Boolean,
    md: Boolean,
  },


  data() {
    return {
    }
  },

  computed: {
    classes() {
      return {
        [this.$options.name]: true,

        [`${this.$options.name}--sm`]: this.sm,
        [`${this.$options.name}--lg`]: this.lg,
        [`${this.$options.name}--suffix`]: this.suffix,
        [`${this.$options.name}--prefix`]: this.prefix,
        [`${this.$options.name}--focused`]: this.isFocused,
      }
    },

    isMultiLine() { return this.type === 'textarea' },

    inputClasses() {
      return {
        [`${this.$options.name}--input`]: true,
      }
    },

    inputValue: {
      get() {
        return this.lazyValue;
      },

      set(val) {
        this.lazyValue = val;
        this.$emit('input', val);
      }
    },

    count() {
      const inputLength = this.lazyValue ? this.lazyValue.toString().length : 0;
      return `${inputLength} / ${this.counterLength}`;
    },

    counterLength() {
      const parsedLength = parseInt(this.counter, 10)
      return isNaN(parsedLength) ? 25 : parsedLength;
    },
  },



  methods: {
    onInput(e) {
      this.inputValue = e.target.value;
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

    genCounter() {
      return this.$createElement('div', {
        'class': {
          [`${this.$options.name}__counter`]: true,
          [`${this.$options.name}__counter--error`]: this.hasError,
        }
      }, this.count)
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
          name: 'vc@transition-slide-y',
        }
      }, messages);
    },

    genInput() {
      const nodeTag   = this.isMultiLine ? 'textarea' : 'input';
      const listeners = Object.assign({}, this.$listeners);

      delete listeners['change']; // Change should not be bound externally

      const nodeOptions = {
        class: {
          [`${this.$options.name}__node`]: true,
        },
        domProps: {
          autofocus  : this.autofocus,
          disabled   : this.disabled,
          required   : this.required,
          value      : this.lazyValue,
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

      if (this.isMultiLine) {
        nodeOptions.domProps.rows = this.rows;
      } else {
        nodeOptions.domProps.type = this.type;
      }

      if (this.placeholder) {
        nodeOptions.domProps.placeholder = this.placeholder;
      }

      return this.$createElement(nodeTag, nodeOptions);
    },
  },

  render(h) {
    return this.genInputGroup(this.genInput(), {attrs: {tabindex: false}});
  },
}
</script>