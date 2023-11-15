// main.js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axiosPlugin from "@/axiosPlugin"; // adjust the path accordingly

Vue.config.productionTip = false;

Vue.use(axiosPlugin);

new Vue({
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
