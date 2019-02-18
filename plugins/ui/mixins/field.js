import Input from './input';



export default function factory(type) {
  return {
    mixins: [Input],

    props: {
      autofocus: Boolean,
      prefix: String,
      suffix: String,
      // sm: Boolean,
      // md: Boolean,
    },

    data() {
      return {
        initialValue: null,
        // suggestIndex: null,
      }
    },

    computed: {
      fieldClasses() {
        return {
          [`vc@${type}`]       : true,
          'vc@field'           : true,
          'vc@field--suffix'   : this.suffix,
          'vc@field--prefix'   : this.prefix,
          'vc@field--focused'  : this.focused,
          'vc@field--suggested': this.suggested,
          // 'vc@field--sm': this.sm,
          // 'vc@field--lg': this.lg,
        }
      },

      inputClasses() {
        return {
          'vc@field--input': true,
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
        if (this.suggest) this.suggestIndex = null;
        this.inputValue = e.target.value;
      },

      onClickLabel(e) {
        return this.focus();
      },

      blur(e) {
        if (this.suggest) {
          if (
            e
            && typeof e === 'object'
            && e.relatedTarget
            && e.relatedTarget.dataset
            && e.relatedTarget.dataset.suggestIndex !== undefined
          ) {
            this.settleSuggest(this.suggests[parseInt(e.relatedTarget.dataset.suggestIndex, 10)]);
          } else if (this.suggestIndex !== null) {
            this.settleSuggest(this.suggests[this.suggestIndex]);
          }
        }

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
          class: `vc@field__${type}`,
        }, this[type])
      },
    },

    render(h) {
      return this.genInputGroup(this.genInput(), {attrs: {tabindex: false}});
    },
  }
}
