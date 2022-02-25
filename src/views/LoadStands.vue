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
import { mapState } from "vuex";

export default {
  components: { ChooseStand, StandLoad },
  data() {
    return {};
  },
  async created() {
    const testURL =
      "http://192.168.0.101/projekty/dataviewer2/public/findbarcodeinallbases?barcode=56DB30001A";
    const myInit = { method: "GET", mode: "no-cors" };
    const myRequest = new Request(testURL, myInit);
    await fetch(myRequest)
      .then(async (res) => await res.json())
      .then((res) => console.log(res))
      .catch(function (e) {
        console.log(e);
      });
  },
  computed: {
    ...mapState({
      standToLoad: (state) => state.standToLoad,
    }),
  },
};
</script>
