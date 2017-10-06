import * as helpers from '../../helpers';
import * as util from '../../util';
import delay from './delay';
import nextTickSync from './nextTickSync';
import nextAnimationFreame from './nextAnimationFreame';
import findParentByName from './findParentByName';



export default function PrototypePlugin(Vue, {protoTypeGlobal = false}) {

  const prototypes = {
    h: helpers,
    u: util,

    __nameSpace__: publicSettings.vue.nameSpace,
    cssPrefix: publicSettings.css.prefix,
  };

  Vue.prototype.$delay = delay;
  Vue.prototype.$nextTickSync = nextTickSync;
  Vue.prototype.$nextAnimationFreame = nextAnimationFreame;
  Vue.prototype.$findParentByName = findParentByName;

  Vue.prototype.$dd = prototypes;
  Vue.prototype[`$${publicSettings.vue.nameSpace}`] = prototypes;

  if (protoTypeGlobal) {
    for (let key in prototypes) {
      Vue.prototype[key] = prototypes[key];
    }
  }
}