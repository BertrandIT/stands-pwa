<template>
  <v-container fluid class="fill-height align-start">
    <choose-stand v-if="Object.keys(standToLoad).length === 0" />
    <stand-load v-else />
  </v-container>
</template>
<script>
// @ is an alias to /src
import ChooseStand from "@/components/LoadStands/ChooseStand.vue";
import StandLoad from "@/components/LoadStands/StandLoad.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: { ChooseStand, StandLoad },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      standToLoad: (state) => state.standToLoad,
      user: (state) => state.user,
    }),
  },
  created() {
    if (localStorage.getItem("user")) {
      this.loginUser(JSON.parse(localStorage.getItem("user")));
    } else if (!this.user.email) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["assignStandsData", "loginUser"]),
  },
};
</script>
