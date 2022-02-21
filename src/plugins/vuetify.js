import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import pl from "vuetify/lib/locale/pl";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pl },
    current: "pl",
  },
});
