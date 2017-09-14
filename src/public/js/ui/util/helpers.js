export function createSimpleFunctional(c, el = 'div') {
  const name = c.replace(/__/g, '-');

  return {
    name: `${publicSettings.css.suffix}${name}`,
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = (`${publicSettings.css.suffix}${c} ${data.staticClass || ''}`).trim();
      return h(el, data, children);
    },
  }
}



export function directiveConfig(binding, defaults = {}) {
  return Object.assign({},
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {},
  )
}



export function addOnceEventListener(el, event, cb) {
  var once = () => {
    cb();
    el.removeEventListener(event, once, false);
  }

  el.addEventListener(event, once, false);
}



export function createRange(length) {
  return [...Array.from({ length }, (v, k) => k)]
}
