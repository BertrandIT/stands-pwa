<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-text-field
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
    <v-btn color="primary" @click="addStand" class="white--text">Dodaj</v-btn>
  </v-container>
</template>
<script>
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
        if (this.stands.includes(this.standBarcode)) {
          this.$root.manageAlert({
            text: `Stojak ${this.standBarcode} został już dodany`,
            type: "warning",
            time: 1500,
          });
        } else {
          this.assignStands([...this.stands, this.standBarcode]);
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
  },
};
</script>
