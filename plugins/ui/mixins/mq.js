import matchMedia from '../manager/matchMedia';



const keys   = [];
const states = {};



matchMedia.conditions.forEach(condition => {
  keys.push(condition.key);
  states[condition.key] = condition.mql.matches;
});



export default {
  data() {
    return {
      mqKeys: keys,
      mq    : states,
    }
  },

  methods: {
    updateMediaQuery() {
      this.mqKeys.forEach(key => {
        this.setMediaQuery(key);
      });
    },
    setMediaQuery(key, isMatch = matchMedia.getConditionByKey(key).mql.matches) {
      this.mq[key] = isMatch;
    },
    startWatchMediaQuery() {
      keys.forEach(key => {
        matchMedia.hasAndOn(`change-${key}.${this._uid}`, isMatch => {
          this.setMediaQuery(key, isMatch);
        });
      });
      this.updateMediaQuery();
    },
    stopWatchMediaQuery() {
      matchMedia.off(`.${this._uid}`);
    },
  },

  created() {
    this.startWatchMediaQuery();
  },

  beforeDestroy() {
    this.stopWatchMediaQuery();
  },
}
