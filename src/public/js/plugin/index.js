import Prototype  from './prototype';
import components from '../components';
import directives from '../directives';



export default function Plugin(Vue, opt = {}) {

  // plugins
  Vue.use(Prototype, opt);

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
}
