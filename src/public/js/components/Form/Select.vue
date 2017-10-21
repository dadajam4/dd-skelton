<script>
import inputMixin from '../../mixins/input';



export default {
  name: 'vn@-select',

  mixins: [inputMixin],

  props: {
    prefix: String,
    suffix: String,
  },


  data() {
    return {
      initialValue: null,
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

  },


  watch: {
    isFocused(val) {
      if (val) {
        this.initialValue = this.lazyValue;
      } else if (this.initialValue !== this.lazyValue) {
        this.$emit('change', this.lazyValue);
      }
    },

    value(val) {
      this.lazyValue = val;
    },

    lazyValue(val) {
      !this.validateOnBlur && this.validate();
      // this.shouldAutoGrow && this.calculateInputHeight()
    },
  },

  methods: {
    onInput(e) {
      this.suggestIndex = null;
      this.inputValue = e.target.value;
    },

    onClickLabel(e) {
      return this.focus();
    },

    blur(e) {
      if (document.activeElement === this.$refs.input) {
        this.$refs.input.blur();
      }

      this.isFocused = false;

      this.$nextTick(() => {
        this.validate();
      });

      this.$emit('blur', e);
    },

    focus(e) {
      this.isFocused = true;
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus();
      }
      this.$emit('focus', e);
    },

    genFix(type) {
      return this.$createElement('span', {
        class: `${this.$options.name}__${type}`,
      }, this[type])
    },

    genInput() {
      const listeners = Object.assign({}, this.$listeners);

      delete listeners['change']; // Change should not be bound externally

      const nodeOptions = {
        class: {
          [`${this.$options.name}__node`]: true,
        },
        domProps: {
          disabled   : this.disabled,
          required   : this.required,
          // value      : this.lazyValue,
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

      const children = [this.$createElement('select', nodeOptions)];

      this.prefix && children.unshift(this.genFix('prefix'));
      this.suffix && children.push(this.genFix('suffix'));

      return children;
    },
  },

  render(h) {
    return this.genInputGroup(this.genInput(), {attrs: {tabindex: false}});
  },
}
</script>