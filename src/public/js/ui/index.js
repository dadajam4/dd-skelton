import components from './components';
import * as directives from './directives';
import load from './util/load';
import store from './vuex/store';



function Ui(Vue) {

  // Directives
  Object.keys(directives).forEach(key => {
    const directive = directives[key];
    Vue.directive(directive.name, directive);
  });

  // Components
  Object.keys(components).forEach(key => {
    const component = components[key];
    Vue.component(component.name, component);
  });

  Vue.mixin({
    store,
  });

  Vue.prototype.$ui = {
    load     : load,
    cssSuffix: publicSettings.css.suffix,
  };
  // Vue.prototype.$scrollToTop = function() {
  //   blurActiveElement();
  //   return this.$scrollTo(document.body);
  // }

  // function blurActiveElement() {
  //   if (document.activeElement && document.activeElement.blur) {
  //     document.activeElement.blur();
  //   }
  // }

  // Global Methods
  Vue.prototype.$delay = function(ammount) {
    let canceled  = false,
        canceller = () => { canceled = true }

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this._isDestroyed && !canceled) resolve();
      }, ammount);
    });

    return {
      cancel : canceller,
      promise: promise,
    }
  }

  Vue.prototype.$nextTickAsync = function(cb) {
    return new Promise(resolve => {
      this.$nextTick(() => {
        if (cb) cb();
        resolve();
      });
    });
  }
}



export default Ui;
