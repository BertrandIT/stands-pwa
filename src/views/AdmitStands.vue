<template>
  <v-container fluid class="fill-height align-start">
    <v-row class="fill-height">
      <v-col>
        <choose-stand-data
          v-if="action === 0"
          @changeAction="changeAction"
          @setData="setData"
        />
        <stands-preview
          v-if="action !== 0"
          @changeAction="changeAction"
          :action="action"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// @ is an alias to /src
import ChooseStandData from "@/components/AdmitStands/ChooseStandData.vue";
import StandsPreview from "@/components/AdmitStands/StandsPreview.vue";

import { mapActions } from "vuex";

export default {
  components: { ChooseStandData, StandsPreview },
  data() {
    return {
      scanning: false,
      action: 0,
      standsData: {},
    };
  },
  methods: {
    ...mapActions(["assignStandsData"]),
    setData(data) {
      if (data.key === "supplier") {
        this.standsData["ownStand"] = data.value === "OWN";
      }
      this.standsData[data.key] = data.value;
    },
    changeAction(action) {
      if (this.standsData.localization && this.standsData.supplier) {
        this.action = action;
        this.assignStandsData(this.standsData);
      } else {
        this.$root.manageAlert({
          text: "Nie podano lokalizacji lub dostawcy",
          type: "error",
        });
      }
    },
  },
};
</script>
