export default {
  namespaced: true,

  state: {
    fixed: false,
  },

  getters: {
    fixed: state => { return state.fixed },
  },

  actions: {
    setFixed: ({commit}, value) => {
      commit('setFixed', value);
    },
  },

  mutations: {
    setFixed: (state, value) => {
      state.fixed = value;
    },
  },
};
