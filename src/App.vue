<template>
  <v-app>
    <main-nav></main-nav>
    <v-main>
      <v-alert
        :value="$root.alert.trigger"
        :type="$root.alert.type"
        dismissible
        style="position: absolute; z-index: 4; width: 100%"
        transition="slide-x-transition"
        shaped
      >
        {{ $root.alert.msg }}
      </v-alert>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MainNav from "./components/MainNav.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: { MainNav },
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  created() {
    if (localStorage.getItem("user")) {
      this.loginUser(JSON.parse(localStorage.getItem("user")));
    } else if (!this.user.username) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["loginUser"]),
  },
};
</script>
