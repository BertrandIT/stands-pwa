<template>
  <v-container fluid>
    <code-scanner @decode="onDecode" v-if="action === 2" />
    <div v-else>
      <p class="text-h5 mt-4 font-weight-bold text-uppercase">
        Lokalizacja: {{ standsData.localization.split("_")[1] }}
      </p>
      <manually-add-stand />
      <stands-swipe />
    </div>
  </v-container>
</template>

<script>
import CodeScanner from "@/components/CodeScanner.vue";
import ManuallyAddStand from "@/components/AdmitStands/ManuallyAddStand.vue";
import StandsSwipe from "@/components/AdmitStands/StandsSwipe.vue";
import { mapState } from "vuex";

export default {
  name: "satnds-preview",
  props: {
    action: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  components: { CodeScanner, ManuallyAddStand, StandsSwipe },
  computed: {
    ...mapState({
      standsData: (state) => state.standsData,
    }),
  },
  methods: {
    onDecode(decodedText) {
      alert(decodedText);
    },
  },
};
</script>

<style scoped></style>
