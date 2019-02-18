export default function nextTickSync(cb) {
  return new Promise(resolve => {
    this.$nextTick(() => {
      if (!this._isDestroyed) resolve();
      if (cb) cb();
    });
  });
}