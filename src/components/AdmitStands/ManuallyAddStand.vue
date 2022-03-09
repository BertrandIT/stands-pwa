<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-text-field
      id="add-stand-input"
      v-model="standBarcode"
      label="Kod stojaka"
      prepend-inner-icon="mdi-barcode"
      class="mx-0"
      clearable
      @keydown.enter="addStand"
      @change="(e) => assignStandBarcode(e)"
      @click:clear="assignStandBarcode('')"
      ref="barcodeinput"
    ></v-text-field>
    <v-btn
      id="add-button"
      color="primary"
      @click="addStand"
      class="white--text mr-2"
      >Dodaj</v-btn
    >
    <v-btn
      id="add-wood-button"
      color="primary"
      @click="addWoodBB('DREWNO')"
      class="white--text mr-2"
      >Dodaj Drewno</v-btn
    >
    <v-btn
      id="add-bb-button"
      color="primary"
      @click="addWoodBB('BB')"
      class="white--text mr-2"
      >Dodaj BB</v-btn
    >
  </v-container>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      standBarcode: "",
    };
  },
  computed: {
    ...mapState({
      stands: (state) => state.stands,
    }),
  },
  mounted() {
    this.$refs.barcodeinput.focus();
  },
  methods: {
    ...mapActions(["assignStands", "assignStandBarcode"]),
    async addStand() {
      if (this.standBarcode) {
        this.standBarcode = this.standBarcode.includes("STAND:")
          ? this.standBarcode.split(":")[1].trim()
          : this.standBarcode.trim().toUpperCase();
        if (this.stands.some((item) => item.barcode === this.standBarcode)) {
          this.$root.manageAlert({
            text: `Stojak ${this.standBarcode} został już dodany`,
            type: "warning",
            time: 1500,
          });
        } else {
          const res = await axios.get(`api/windowStand/${this.standBarcode}`);
          this.assignStands([
            ...this.stands,
            {
              barcode: this.standBarcode,
              daysleft: this.calcDeadline(res.data.deadline),
            },
          ]);
          this.$root.manageAlert({
            text: `Dodano stojak ${this.standBarcode}`,
            type: "success",
            time: 1500,
          });
        }
        this.assignStandBarcode("");
        this.standBarcode = "";
        this.$refs.barcodeinput.focus();
      }
    },
    calcDeadline(deadline) {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(deadline);
      const secondDate = new Date();
      if (deadline === undefined) {
        return null;
      } else if (deadline === null) {
        return "Stojak własny";
      }
      return Math.round(Math.abs((firstDate - secondDate) / oneDay));
    },
    async addWoodBB(type) {
      let max = 0;
      if (this.stands.some((item) => item.barcode.includes(type))) {
        this.stands.forEach((stand) => {
          if (stand.barcode.includes(type)) {
            max =
              stand.barcode.split(type)[1] > max
                ? +stand.barcode.split(type)[1]
                : max;
          }
        });
        this.assignStands([
          ...this.stands,
          { barcode: type + (max + 1), daysleft: null },
        ]);
        this.$root.manageAlert({
          text: `Dodano stojak ${type + (max + 1)}`,
          type: "success",
          time: 1500,
        });
      } else {
        const res =
          type === "DREWNO"
            ? await axios.get(`api/woodstandnumber`)
            : await axios.get(`api/bbstandnumber`);
        this.assignStands([
          ...this.stands,
          { barcode: type + (res.data[0].num + 1), daysleft: null },
        ]);
        this.$root.manageAlert({
          text: `Dodano stojak ${type + (res.data[0].num + 1)}`,
          type: "success",
          time: 1500,
        });
      }
    },
  },
};
</script>
