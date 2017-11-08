import fieldFactory from '../../mixins/Field';



const Field = fieldFactory('select');



export default {
  name: 'vn@-select',

  mixins: [Field],

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    rightIcon: {
      type: String,
      default: 'sort',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },


  data() {
    return {
      menuIsActive: false,
    }
  },

  computed: {
    classes() {
      return Object.assign({}, this.fieldClasses, {
        // 'vc@select--xxxxx': this.xxxxx,
      });
    },

    createdItems() {
      const $slotItems = this.$slots.default ?
        this.$slots.default.filter(c => c.tag === 'vn@-option').map(c => {
          return {
            value  : c.data.attrs && c.data.attrs.value || null,
            content: c.children,
          }
        })
        : [];

      const $propItems = this.items.map(item => {
        const itemIsObject = item && typeof item === 'object';
        return {
          value  : itemIsObject ? item.value : item,
          content: [itemIsObject ? item.content || item.value : item],
        }
      });

      return $propItems.concat($slotItems);
    },

    selectedItems() {
      if (!this.isMultiple) {
        const item = this.createdItems.find(item => item.value === this.inputValue);
        return item !== undefined ? [item] : [];
      } else {
        return this.createdItems.filter(item => this.inputValue.includes(item.value));
      }
    },

    isMultiple() { return this.multiple },
  },



  methods: {
    genInput() {
      const listeners = Object.assign({}, this.$listeners);

      delete listeners['change']; // Change should not be bound externally

      const nodeOptions = {
        class: {
          'vc@field__node': true,
          'vc@field__custom-node': true,
        },
        domProps: {
          // type     : 'text',
          autofocus: this.autofocus,
          disabled : this.disabled,
          // required : this.required,
          // value    : this.lazyValue,
        },
        attrs: {
          // ...this.$attrs,
          // name    : this.name,
          // readonly: this.readonly,
          tabindex: this.tabindex,
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label, // Label `for` will be set if we have an id
        },
        on: Object.assign({}, listeners, {
          blur: this.blur,
          // input: this.onInput,
          // focus: e => {
          //   this.menuIsActive = true;
          //   return this.focus(e);
          // },
          focus: this.focus,
        }),
        ref: 'input',
      };

      if (this.placeholder) {
        nodeOptions.domProps.placeholder = this.placeholder;
      }

      const $selectedItems = this.selectedItems.map(item => {
        return this.$createElement('li', {
          staticClass: 'vc@select__selected-item',
        }, item.content);
      });

      const children = [this.$createElement('ul', nodeOptions, $selectedItems)];

      this.prefix && children.unshift(this.genFix('prefix'));
      this.suffix && children.push(this.genFix('suffix'));

      // 選択しているinput値をhiddenで列挙
    // selectedItems() {
    //   if (!this.isMultiple) {
    //     const item = this.createdItems.find(item => item.value === this.inputValue);
    //     return item !== undefined ? [item] : [];
    //   } else {
    //     return this.createdItems.filter(item => this.inputValue.includes(item.value));
    //   }
    // },

      if (this.name) {
        if (!this.isMultiple) {
          children.push(this.$createElement('input', {
            domProps: {
              type: 'hidden',
              value: this.inputValue,
              name: this.name,
            },
          }));
        } else {
          this.selectedItems.forEach(item => {
            children.push(this.$createElement('input', {
              domProps: {
                type: 'hidden',
                value: item.value,
                name: `${this.name}[]`,
              },
            }));
          });
        }
      }

      return children;
    },

    selectItem(item) {
      const selectValue = item && typeof item === 'object' ? item.value : item;

      if (!this.isMultiple) {
        this.inputValue = selectValue;
      } else {
        const selectedValues = [];
        const hasSelectValue = this.inputValue.includes(selectValue);

        this.createdItems.forEach(createdItem => {
          if (createdItem.value === selectValue) {
            if (!hasSelectValue) {
              selectedValues.push(createdItem.value);
            }
          } else if (this.inputValue.includes(createdItem.value)) {
            selectedValues.push(createdItem.value);
          }
        });

        this.inputValue = selectedValues;
      }
    },

    genMenu() {
      const $tiles = [];

      this.createdItems.forEach(item => {
        const value = !this.isMultiple ? item.value === this.inputValue : this.inputValue.includes(item.value);

        const children = !this.isMultiple ? [item.content] : [
          this.$createElement('vn@-list-tile-action', {

          }, [
            this.$createElement('vn@-checkbox', {
              props: {
                inputValue: value,
                tabindex: -1,
              },
            }),
          ]),
          this.$createElement('vn@-list-tile-content', {
          }, [item.content]),
        ];

        const $tile = this.$createElement('vn@-list-tile', {
          on: {
            click: e => {
              // this.onClickItem(item);
              this.selectItem(item);
            },
          },
          props: {
            // avatar: item === Object(item) && this.itemAvatar in item,
            // ripple: true,
            value,
          },
        }, children);

        $tiles.push($tile);
      });

      const $menu = this.$createElement('vn@-menu', {
        props: {
          // activator: this.$el,
          activator: this.$refs.input,
          offsetY: true,
          // nudgeTop: 26,
          closeOnClick: true,
          closeOnContentClick: !this.isMultiple,
          disabled: this.disabled,
          // maxHeight: this.maxHeight,
          // openOnClick: false,

          value: this.menuIsActive/* && (....)*/,
          // zIndex: this.menuZIndex,
        },

        on: {
          input: val => {
            if (!val) {
              this.menuIsActive = false;
            }
          }
        },
      }, [
        this.$createElement('vn@-list', {}, $tiles),
      ]);

      return $menu;
    },
  },

  render(h) {
    const $menu = this.genMenu();
    return this.genInputGroup(this.genInput(), {attrs: {tabindex: false}}, {menu: $menu});
  },
}
