function onInput(e) {
  const el  = e.target;

  let min   = parseInt(el.min  , 10),
      max   = parseInt(el.max  , 10),
      value = parseInt(el.value, 10);

  min   = isNaN(min  ) ? null : min;
  max   = isNaN(max  ) ? null : max;
  value = isNaN(value) ? null : value;

  if (value === null) {
    el.value = '';
    return;
  }

  const before = value;

  if (min !== null && value < min) {
    value = min;
  } else if (max !== null && value > max) {
    value = max;
  }

  if (value !== before) {
    el.value = value;
  }
}

function bindNumberInRange(el, binding, vnode) {
  el.addEventListener('input', onInput, false);
}



export default {
  bind(el, binding, vnode) {
    bindNumberInRange(el, binding, vnode);
  },

  componentUpdated(el, binding, vnode) {
    bindNumberInRange(el, binding, vnode);
  },
}