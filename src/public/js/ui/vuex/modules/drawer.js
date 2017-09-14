const state = {};
const getters = {};
const actions = {};
const mutations = {};

['left', 'right'].forEach(vec => {
  const setterName = `set${vec}`;

  state[vec] = false;
  state[`${vec}static`] = false;

  getters[vec] = state => state[vec];
  getters[`${vec}static`] = state => state[`${vec}static`];

  actions[setterName] = ({commit}, value) => { commit(setterName, value) }
  actions[`${setterName}static`] = ({commit}, value) => { commit(`${setterName}static`, value) }

  mutations[setterName] = (state, value) => { state[vec] = value }
  mutations[`${setterName}static`] = (state, value) => { state[`${vec}static`] = value }
});

export default {
  namespaced: true,

  state,
  getters,
  actions,
  mutations,
};
