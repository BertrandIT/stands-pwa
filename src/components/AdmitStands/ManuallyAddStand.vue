<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-alert
      :value="alert.trigger"
      :type="alert.type"
      dismissible
      style="position: absolute; z-index: 4"
      transition="slide-x-transition"
    >
      {{ alert.msg }}
    </v-alert>
    <v-text-field
      v-model="standBarcode"
      label="Kod stojaka"
      prepend-inner-icon="mdi-barcode"
      class="mx-0"
      clearable
      @keydown.enter="addStand"
      @change="(e) => assignStandBarcode(e)"
      @click:clear="assignStandBarcode('')"
    ></v-text-field>
    <v-btn color="primary" @click="addStand" class="white--text">Dodaj</v-btn>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      standBarcode: "",
      alert: {
        trigger: false,
      },
    };
  },
  computed: {
    ...mapState({
      stands: (state) => state.stands,
    }),
  },
  methods: {
    ...mapActions(["assignStands", "assignStandBarcode"]),
    async addStand() {
      if (this.standBarcode) {
        this.standBarcode = this.standBarcode.includes("STAND:")
          ? this.standBarcode.split(":")[1].trim()
          : this.standBarcode.trim().toUpperCase();
        if (this.stands.includes(this.standBarcode)) {
          // await this.triggerAlert(
          //   `Stojak ${this.standBarcode} został już dodany`,
          //   "warning",
          //   1500
          // );
        } else {
          this.assignStands([...this.stands, this.standBarcode]);
          // await this.triggerAlert(
          //   `Dodano stojak ${this.standBarcode}`,
          //   "success",
          //   1500
          // );
        }
        this.assignStandBarcode("");
        this.standBarcode = "";
      }
    },
    triggerAlert(msg, type, time = 3000) {
      return new Promise(() => {
        this.alert.msg = msg;
        this.alert.type = type;
        this.alert.trigger = true;
        setTimeout(() => {
          this.alert.trigger = false;
        }, time);
      });
    },
  },
};
</script>
