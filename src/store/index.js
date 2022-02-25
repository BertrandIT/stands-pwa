import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    standsData: {},
    standBarcode: "",
    standToLoad: {},
    stands: [],
    standLoad: [],
    deleted: [],
    user: {},
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
    setStandLoad(state, data) {
      state.standLoad = data;
    },
    setDeleted(state, data) {
      state.deleted = data;
    },
    clearStandToLoad(state) {
      state.standToLoad = {};
    },
    setUserData(state, data) {
      state.user = data;
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
    assignStandLoad({ commit }, data) {
      commit("setStandLoad", data);
    },
    assignDeleted({ commit }, data) {
      commit("setDeleted", data);
    },
    loginUser({ commit }, data) {
      commit("setUserData", data);
    },
    clearStandToLoad({ commit }) {
      commit("clearStandToLoad");
    },
  },
  modules: {},
});
