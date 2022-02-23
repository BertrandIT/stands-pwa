<template>
  <v-container fluid class="fill-height align-start">
    <v-alert
      :value="alert.trigger"
      :type="alert.type"
      dismissible
      style="position: absolute; z-index: 4"
      transition="slide-x-transition"
    >
      {{ alert.msg }}
    </v-alert>
    <v-row class="fill-height">
      <v-col>
        <choose-stand-data
          v-if="action === 0"
          @changeAction="changeAction"
          @setData="setData"
        />
        <stands-preview v-if="action !== 0" :action="action" />
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
  name: "AdmitStands",
  components: { ChooseStandData, StandsPreview },
  data() {
    return {
      scanning: false,
      action: 0,
      standsData: {},
      alert: {
        trigger: false,
      },
    };
  },
  methods: {
    ...mapActions(["assignStandsData"]),
    setData(data) {
      this.standsData[data.key] = data.value;
    },
    changeAction(action) {
      if (this.standsData.localization && this.standsData.supplier) {
        this.action = action;
        this.assignStandsData(this.standsData);
      } else {
        this.alert.msg = "Nie podano lokalizacji lub dostawcy";
        this.alert.type = "error";
        this.alert.trigger = true;
        setTimeout(() => {
          this.alert.trigger = false;
        }, 3000);
      }
    },
  },
};
</script>
