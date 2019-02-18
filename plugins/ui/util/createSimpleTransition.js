export default function createSimpleTransition(name, origin = 'top center 0', mode) {
  return {
    name: `vn@-${name}`,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin,
      }
    },

    render(h, context) {
      context.data = context.data || {};
      context.data.props = { name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = { ...context.data.on };
      }

      if (mode) context.data.props.mode = mode;

      context.data.on.beforeEnter = el => {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      }

      return h('transition', context.data, context.children);
    }
  }
}