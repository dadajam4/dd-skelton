import rules from './rules';



export default function ValidatorPlugin(Vue) {

  Vue.prototype.$rules = rules;

  Vue.mixin({
    $errors() {},
  });
}