export default function nextAnimationFreame(cb) {
  return new Promise(resolve => {
    this.$nextTick(() => {
      requestAnimationFrame(() => {
        if (!this._isDestroyed) resolve();
        if (cb) cb();
      });
    });
  });
}