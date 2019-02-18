export default function addOnceEventListener(el, event, cb) {
  let once = () => {
    cb();
    el.removeEventListener(event, once, false);
  }

  el.addEventListener(event, once, false);
}
