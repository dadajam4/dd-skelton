export default function findParentByName(name, opt = {}) {
  let $parent = opt.includeThis === true ? this : this.$parent;
  while ($parent) {
    if (typeof $parent.$options === 'object' && $parent.$options.name === name) return $parent;
    $parent = $parent.$parent;
  }
}
