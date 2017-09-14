import EventManager       from 'dd-event-manager';
import mediaQuerySettings from 'constants/sass/media-query-settings';



class DDMatchMedia {
  constructor(settings) {
    new EventManager(this);

    this.settings   = settings;
    this.context    = document.documentElement;
    this.conditions = [];
    this.current    = {key: null, group: null};

    this.setup();
  }



  setup() {
    this.settings.breakPoints.forEach(breakPoint => {
      const conditions = [`${this.settings.target}`];
      ['min', 'max'].forEach(key => {
        if (breakPoint[key]) conditions.push(`(${key}-width: ${breakPoint[key]}px)`);
      });

      this.conditions.push({type: 'key', key: breakPoint.key, condition: conditions.join(' and ')});
    });

    for (let key in this.settings.groups) {
      const conditions = [`${this.settings.target}`],
            group      = this.settings.groups[key],
            target     = group.min ? 'min' : 'max',
            keyValue   = group[target],
            value      = this.settings.breakPoints.find(breakPoint => breakPoint.key === keyValue)[target],
            condition  = `(${target}-width: ${value}px)`;

      conditions.push(condition);
      this.conditions.push({type: 'group', key: key, condition: conditions.join(' and ')});
    }

    this.conditions.forEach(condition => {
      condition.mql = window.matchMedia(condition.condition);
      condition.mql.addListener(() => {
        return this.checkCondition(condition);
      });
      this.checkCondition(condition);
    });
  }



  checkCondition(condition) {
    if (condition.mql.matches) this.set(condition);
  }



  getConditionByKey(key) {
    return this.conditions.find(condition => condition.key === key);
  }



  set(condition) {
    condition = typeof condition === 'string' ? this.getConditionByKey(condition) : condition;

    const key      = condition.key,
          type     = condition.type,
          old      = this.current[type];

    this.current[type] = key;

    if (old !== key) {
      this.emit('change', key);
      if (type === 'key') this.emit('changeKey', key);
      if (type === 'group') this.emit('changeGroup', key);
    }
  }
}



export default new DDMatchMedia(mediaQuerySettings);