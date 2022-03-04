<template>
  <v-container fluid>
    <v-row v-if="user.email">
      <v-col
        v-for="(tab, idx) of tabs"
        :key="idx"
        cols="12"
        class="d-flex justify-center"
      >
        <router-link :to="tab.link">
          <v-btn x-large color="primary" style="width: 75vw">
            {{ tab.text }}
          </v-btn>
        </router-link></v-col
      >
    </v-row>
    <v-row v-else>
      <v-col class="flex-column d-flex">
        <v-text-field id="loginId" label="Login" v-model="userlogin"></v-text-field>
        <v-text-field
          id="passwordId"
          label="Hasło"
          type="password"
          v-model="password"
          @keydown.enter="() => login()"
        ></v-text-field>
        <v-btn id="zaloguj" x-large color="success" @click="login">Zaloguj</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "@/axios";
import { mapState, mapActions } from "vuex";
// @ is an alias to /src
export default {
  name: "HomeView",
  data() {
    return {
      userlogin: "",
      password: "",
      tabs: [
        { text: "Przyjęcie stojaków", link: "/admitStands" },
        { text: "Załadunek stojaków", link: "/loadStands" },
        { text: "Wysyłka stojaków", link: "/sendStands" },
        { text: "Zwrot stojaków", link: "/returnStands" },
        { text: "Przegląd historii", link: "/viewHistory" },
      ],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions(["loginUser"]),
    async login() {
      await axios
        .get(
          "api/usershow/" + this.userlogin.toUpperCase() + "/" + this.password
        )
        .then(async (response) => {
          if (response.data.user == null) {
            this.$root.manageAlert({
              text: "Błędny login",
              type: "error",
              time: 20000,
            });
          } else {
            this.loginUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            this.userlogin = "";
            this.password = "";
          }
        })
        .catch(() => {
          this.$root.manageAlert({
            text: "Sprawdź połączenie z Internetem, bądź skontaktuj się z działem IT",
            type: "error",
          });
        });
    },
  },
};
</script>
