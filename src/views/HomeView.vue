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
          <v-btn x-large color="primary" style="width: 75vw" :id="`homebutton-${idx}`">
            {{ tab.text }}
          </v-btn>
        </router-link></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      tabs: [
        { text: "Przyjęcie", link: "/admitStands" },
        { text: "Załadunek stojaków", link: "/loadStands" },
        { text: "Wysyłka stojaków", link: "/sendStands" },
        { text: "Zwrot stojaków", link: "/returnStands" },
        { text: "Przegląd historii", link: "/viewHistory" },
      ],
    };
  },
};
</script>
