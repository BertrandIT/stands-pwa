<template>
  <v-app>
    <main-nav></main-nav>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MainNav from "./components/MainNav.vue";

export default {
  components: { MainNav },
  name: "App",

  data() {
    return {};
  },
};
</script>
