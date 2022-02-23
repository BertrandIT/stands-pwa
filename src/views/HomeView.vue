<template>
  <v-container fluid>
    <v-row>
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
    <v-btn likn to="/viewHistory/9746/Drewno140">Click me</v-btn>
  </v-container>
</template>

<script>
// @ is an alias to /src
// axios test
import axios from "@/axios";

export default {
  name: "HomeView",
  data() {
    return {
      tabs: [
        { text: "Przyjęcie stojaków", link: "/admitStands" },
        { text: "Załadunek stojaków", link: "/loadStands" },
        { text: "Wysyłka stojaków", link: "/sendStands" },
        { text: "Zwrot stojaków", link: "/returnStands" },
        { text: "Przegląd historii", link: "/viewHistory" },
      ],
    };
  },
  created() {
    // axios test
    const res = axios.get("/api/windowStands");
    console.log(res.data);
  },
};
</script>
