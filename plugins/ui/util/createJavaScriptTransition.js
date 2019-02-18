export default function createJavaScriptTransition(name, functions, css = true, mode = 'in-out') {
  return {
    name: `vn@-${name}`,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css,
      },
      mode: {
        type: String,
        default: mode,
      }
    },

    render(h, context) {
      const data = {
        props: {
          ...context.props,
          name,
        },
        on: functions,
      }

      return h('transition', data, context.children);
    }
  }
}