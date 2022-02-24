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

export default {
  components: { MainNav },
  name: "App",
  data() {
    return {};
  },
  methods: {},
};
</script>
