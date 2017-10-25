import Colorable from './colorable';
import Input from './input'

export default {
  mixins: [Input, Colorable],

  model: {
    prop: 'inputValue',
    event: 'change',
  },

  data() {
    return {
      defaultColor: 'accent',
      internalValueStore: null,
    }
  },

  props: {
    id: String,
    inputValue: null,
    falseValue: null,
    trueValue: null,
  },

  computed: {
    isActive() {
      if ((Array.isArray(this.inputValue))
      ) {
        return this.inputValue.indexOf(this.value) !== -1
      }

      if (!this.trueValue || !this.falseValue) {
        return this.value
          ? this.value === this.internalValue
          : Boolean(this.inputValue)
      }

      return this.inputValue === this.trueValue;
    },
    isDirty() {
      return this.isActive;
    },
    internalValue: {
      get() { return this.internalValueStore },
      set(val) {
        this.internalValueStore = val;
        this.$emit('change', val);
      },
    },
  },

  watch: {
    indeterminate(val) {
      this.inputIndeterminate = val;
    }
  },

  methods: {
    genLabel() {
      return this.$createElement('label', {
        staticClass: 'vc@input-group__selection-label',
        on: { click: this.toggle },
        attrs: {
          for: this.id,
        },
      }, this.$slots.label || this.label)
    },

    toggle() {
      if (this.disabled) return;
      return (this.$refs.input.checked ? this.uncheck : this.check)();
    },

    check() {
      let input = this.inputValue;

      if (Array.isArray(input)) {
        input = input.slice();
        const i = input.indexOf(this.value);
        if (i !== -1) input.splice(i, 1);
        input.push(this.value);
      } else if (this.trueValue) {
        input = this.trueValue;
      } else if (this.value) {
        input = this.value;
      } else {
        input = true;
      }

      this.changeAfter(input);
    },

    uncheck() {
      let input = this.inputValue;
      if (Array.isArray(input)) {
        input = input.slice();
        const i = input.indexOf(this.value);
        if (i !== -1) input.splice(i, 1);
      } else if (this.falseValue) {
        input = this.falseValue;
      } else if (this.value) {
        input = null;
      } else {
        input = false;
      }

      this.changeAfter(input);
    },

    changeAfter(input) {
      this.validate(true, input);
      this.internalValue = input;
    },

    onChange(e) {
      return (e.target.checked ? this.check : this.uncheck)();
    },
  }
}