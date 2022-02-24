import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    standsData: {},
    standBarcode: "",
    standToLoad: {},
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
    setStandBarcode(state, data) {
      state.standBarcode = data;
    },
    setStandToLoad(state, { barcode, id, deadline, action, wasEmpty }) {
      state.standToLoad = {
        barcode: barcode
          ? barcode.trim().toUpperCase()
          : state.standToLoad.barcode,
        id: id ? id : state.standToLoad.id,
        deadline: deadline ? deadline : state.standToLoad.deadline,
        action: action ? action : state.standToLoad.action,
        wasEmpty:
          wasEmpty !== undefined ? wasEmpty : state.standToLoad.wasEmpty,
      };
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
    assignStandBarcode({ commit }, data) {
      commit("setStandBarcode", data);
    },
    assignStandToLoad({ commit }, data) {
      commit("setStandToLoad", data);
    },
  },
  modules: {},
});
