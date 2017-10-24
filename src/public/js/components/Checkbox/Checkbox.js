import Selectable from '../../mixins/selectable';



export default {
  name: 'vn@-checkbox',

  mixins: [Selectable],

  data() {
    return {
      inputIndeterminate: this.indeterminate,
    }
  },

  props: {
    indeterminate: Boolean,
  },

  computed: {
    classes() {
      const classes = {
        'vc@checkbox': true,
        'vc@input-group--selection-controls': true,
        'vc@input-group--active': this.isActive
      }

      if (this.hasError) {
        classes['vc@error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes
    },
  },

  methods: {
    groupFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
    groupBlur(e) {
      this.isFocused = false;
      this.tabFocused = false;
      this.$emit('blur', this.inputValue);
    }
  },

  render(h) {
    const $input = h('input', {
      staticClass: 'vc@checkbox__node vc@input-group__selection-node',
      domProps: {
        type    : 'checkbox',
        value   : this.value || true,
        checked : this.isActive,
        disabled: this.disabled,
        required: this.required,
      },

      attrs: {
        ...this.$attrs,
        readonly: this.readonly,
        tabindex: -1,
        name    : this.name,
      },

      on: {
        change: this.onChange,
      },

      ref: 'input',
    });

    const $faux = h('i', {
      staticClass: 'vc@checkbox__faux vc@input-group__selection-faux',
      class: {'vc@checkbox__faux--indeterminate': this.inputIndeterminate},
      on: {
        click: e => {
          this.toggle();
        },
      },
    });

    if (this.isActive && !this.inputIndeterminate) {
      $faux.children = [
        h('span', {
          staticClass: 'vc@checkbox__faux__body',
        }, [
          h('span', {staticClass: 'vc@checkbox__faux__body-bar'}),
          h('span', {staticClass: 'vc@checkbox__faux__body-bar'}),
        ]),
      ];
    }

    const children = [$input, $faux];

    const data = {
      attrs: {
        tabindex: this.disabled
          ? -1
          : this.internalTabIndex || this.tabindex,
        role: 'checkbox',
        'aria-checked': this.inputIndeterminate && 'mixed' || this.isActive && 'true' || 'false',
        'aria-label': this.label,
      }
    }

    return this.genInputGroup(children, data, {labelInsertForInput: true});
  }
}