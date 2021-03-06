import Routable from '../../mixins/routable';
import Toggleable from '../../mixins/toggleable';
// import Ripple from '../../directives/ripple'

export default {
  name: 'vn@-list-tile',

  mixins: [Routable, Toggleable],

  // directives: {
  //   Ripple
  // },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default: 'vc@list__tile--active'
    },
    avatar: Boolean,
    inactive: Boolean,
    tag: String
  },

  computed: {
    classes() {
      return {
        'vc@list__tile': true,
        'vc@list__tile--link': this.isLink && !this.inactive,
        'vc@list__tile--avatar': this.avatar,
        'vc@list__tile--disabled': this.disabled,
        [this.activeClass]: this.isActive,
      }
    },
    isLink() {
      return this.href || this.to ||
        (this.$listeners && (this.$listeners.click || this.$listeners['!click']))
    }
  },

  render(h) {
    const isRouteLink = !this.inactive && this.isLink;
    const { tag, data } = isRouteLink ? this.generateRouteLink() : {
      tag: this.tag || 'div',
      data: {
        class: this.classes,
      }
    }

    data.attrs = Object.assign({}, data.attrs, this.$attrs);

    return h('li', {
      attrs: {
        disabled: this.disabled,
      },
      on: {
        ...this.$listeners,
      }
    }, [h(tag, data, this.$slots.default)]);
  }
}