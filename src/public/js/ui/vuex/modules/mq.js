import matchMedia from '../../util/match-media';



const state = {keys: []};
const getters = {};
const mutations = {};
const keys = [];



matchMedia.conditions.forEach(condition => {
  keys.push(condition.key);
  state[condition.key] = condition.mql.matches;

  getters.keys = () => keys;
  getters[condition.key] = state => {
    return state[condition.key];
  };

  mutations[`set${condition.key}`] = (state, enabled) => {
    state[condition.key] = enabled;
  };
});



export default {
  namespaced: true,

  state,
  getters,
  mutations,

  actions: {
    run({ dispatch, commit, state }) {
      matchMedia.on('change', key => {
        dispatch('update')
      });
    },

    update({ dispatch, commit, state }) {
      matchMedia.conditions.forEach(condition => {
        commit(`set${condition.key}`, condition.mql.matches);
      });
    },
  },
};
