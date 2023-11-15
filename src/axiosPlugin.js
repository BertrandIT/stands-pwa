import axios from "axios";

const instanceDjango = axios.create({
  baseURL: process.env.VUE_APP_DJANGO_API_URL,
});

const instanceBBS = axios.create({
  baseURL: process.env.VUE_APP_BBS_API_URL,
});

export default {
    install(Vue) {
      Vue.prototype.$axiosDjango = instanceDjango;
      Vue.prototype.$axiosBBS = instanceBBS;
    },
};