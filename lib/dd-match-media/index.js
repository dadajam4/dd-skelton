import EventManager from 'dd-event-manager';



export default class DDMatchMedia {



  /**
   * constructor
   */
  constructor(settings) {
    new EventManager(this);

    this.settings   = settings;
    this.context    = document.documentElement;
    this.conditions = [];
    this.current    = {key: null, group: null};

    this.setup();
  }



  /**
   * setup
   */
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



  /**
   * check condition
   */
  checkCondition(condition) {
    const isMatch = condition.mql.matches;
    this.set(condition, isMatch);
    return isMatch;
  }



  /**
   * get condition by key
   */
  getConditionByKey(key) {
    return this.conditions.find(condition => condition.key === key);
  }



  /**
   * set condition or key
   */
  set(condition, isMatch) {
    condition = typeof condition === 'string' ? this.getConditionByKey(condition) : condition;

    const key  = condition.key,
          type = condition.type,
          old  = this.current[type];

    if (isMatch) {
      this.current[type] = key;

      if (old !== key) {
        if (type === 'key') this.emit('changeKey', key);
        if (type === 'group') this.emit('changeGroup', key);
      }
    }

    this.emit(`change-${key}`, isMatch);
  }
}
