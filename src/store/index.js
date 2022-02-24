import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    standsData: {},
    stands: [],
  },
  getters: {},
  mutations: {
    setStandsData(state, data) {
      state.standsData = data;
    },
    setStands(state, data) {
      state.stands = data;
    },
  },
  actions: {
    assignStandsData({ commit }, data) {
      const temp = { ...data, ownStand: data.ownStand ? data.ownStand : false };
      commit("setStandsData", temp);
    },
    assignStands({ commit }, data) {
      commit("setStands", data);
    },
  },
  modules: {},
});
