let loaded = false;

function load(cb) {
  return new Promise(resolve => {
    if (loaded) {
      if (typeof cb === 'function') cb();
      return resolve();
    }

    const onLoad = () => {
      loaded = true;
      if (typeof cb === 'function') cb();
      resolve();
    }

    const internalLoad = (i = 0) => {
      if (document.readyState === 'complete') return onLoad();
      if (document.readyState === 'interactive' && i <= 10) return setTimeout(() => internalLoad(i + 1), 200);
      window.addEventListener('load', onLoad);
    }

    internalLoad();
  });
}

export default load;
