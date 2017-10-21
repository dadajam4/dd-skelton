export default {
  name: 'vn@-avatar',

  functional: true,

  props: {
    size: {
      type: String,
      default: null,
    },
    tile: Boolean,
  },

  render (h, { data, props, children }) {
    data.staticClass = (`vc@avatar ${data.staticClass || ''}`).trim();
    data.style = data.style || {};

    if (props.tile) data.staticClass += ' vc@avatar--tile';

    if (isNaN(props.size)) {
      data.style.height = props.size;
      data.style.width = props.size;
    } else if (props.size) {
      data.staticClass += ` vc@avatar--${props.size}`;
    }

    return h('div', data, children);
  }
}