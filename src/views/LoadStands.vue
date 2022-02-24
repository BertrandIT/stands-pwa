<template>
  <v-container fluid class="fill-height align-start">
    <choose-stand />
  </v-container>
</template>
<script>
// @ is an alias to /src
import ChooseStand from "@/components/LoadStands/ChooseStand.vue";
// import { mapActions } from "vuex";

export default {
  components: { ChooseStand },
  data() {
    return {};
  },
};
</script>
