import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    standsData: {},
  },
  getters: {},
  mutations: {
    setStandsData(state, data) {
      state.standsData = data;
    },
  },
  actions: {
    assignStandsData({ commit }, data) {
      const temp = { ...data, ownStand: data.ownStand ? data.ownStand : false };
      commit("setStandsData", temp);
    },
  },
  modules: {},
});
