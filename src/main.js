import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import axios from "./axios";

Vue.config.productionTip = false;

new Vue({
  axios,
  router,
  store,
  vuetify,
  render: (h) => h(App),
  data: {
    alert: {
      trigger: false,
      msg: "",
      type: "info",
    },
  },
  computed: {
    windowHeight() {
      return window.innerHeight;
    },
  },
  methods: {
    manageAlert({ text, type, callback = null, time = 3000 }) {
      this.alert.msg = text;
      this.alert.type = type;
      this.alert.trigger = true;
      setTimeout(() => {
        if (callback) {
          callback();
        }
        this.resetAlert();
      }, time);
    },
    resetAlert() {
      this.alert.trigger = false;
      this.alert.msg = null;
      this.alert.type = "info";
    },
  },
}).$mount("#app");
