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
import loginCheck from "@/mixins/loginCheck";

export default {
  components: { ChooseStand, StandLoad },
  mixins: [loginCheck],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      standToLoad: (state) => state.standToLoad,
    }),
  },
  methods: {
    ...mapActions(["assignStandsData"]),
  },
};
</script>
