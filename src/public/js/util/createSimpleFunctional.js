export default function createSimpleFunctional(c, el = 'div') {
  const name = c.replace(/__/g, '-');

  return {
    name: `vn@-${name}`,
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = (`${publicSettings.css.prefix}${c} ${data.staticClass || ''}`).trim();
      return h(el, data, children);
    },
  }
}
