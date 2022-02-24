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
    ...mapActions(["assignStands"]),
    addStand() {
      this.standBarcode = this.standBarcode.includes("STAND:")
        ? this.standBarcode.split(":")[1].trim()
        : this.standBarcode.trim().toUpperCase();
      if (this.stands.includes(this.standBarcode)) {
        this.alert.msg = `Stojak ${this.standBarcode} został już dodany`;
        this.alert.type = "warning";
        this.alert.trigger = true;
        setTimeout(() => {
          this.alert.trigger = false;
          this.scanned = false;
        }, 1500);
      } else {
        this.assignStands([...this.stands, this.standBarcode]);
        this.alert.msg = `Dodano stojak ${this.standBarcode}`;
        this.alert.type = "success";
        this.alert.trigger = true;
        setTimeout(() => {
          this.alert.trigger = false;
          this.scanned = false;
        }, 1500);
      }
      this.standBarcode = "";
    },
  },
};
</script>
