const path = require('path');



class DDPathSetting {
  constructor(settings, $parent) {
    const $names = {};

    Object.defineProperty(this, '$parent', {
      get: () => { return $parent }
    });

    Object.defineProperty(this, '$names', {
      get: () => { return $names }
    });

    if (!$parent) {
      this.root = settings.root || '';
    } else {
      $names.root = settings.root;
      this.root   = path.join(this.$parent.root, settings.root);
    }

    for (const key in settings) {
      let value = settings[key];
      if (typeof value === 'object') {
        this[key] = new DDPathSetting(value, this);
      } else if (typeof value === 'string') {
        if (this.$parent && key !== 'root') {
          $names[key] = value;
          this[key] = path.join(this.root, value);
        }
      }
    }
  }
}



module.exports = DDPathSetting;
