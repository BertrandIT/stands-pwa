<template>
  <v-app-bar app color="primary" dark>
    <router-link to="/"
      ><v-btn @click="resetState" text>Stojaki</v-btn></router-link
    >
    <router-link v-if="user.email" to="/"
      ><v-btn id="logout" text @click="logout"
        ><v-icon>mdi-account</v-icon>
        <p class="mt-4">{{ user.email }}</p></v-btn
      ></router-link
    >
    <v-spacer></v-spacer>
    <v-btn text><v-icon>mdi-open-in-new</v-icon> </v-btn>
  </v-app-bar>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions(["loginUser", "resetState"]),
    logout() {
      this.loginUser({});
      localStorage.removeItem("user");
    },
  },
};
</script>
