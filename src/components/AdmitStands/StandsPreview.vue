<template>
  <v-container fluid>
    <code-scanner @decode="onDecode" v-if="scanning" />
    <div v-else>
      <p class="text-h5 mt-4 font-weight-bold text-uppercase">
        Lokalizacja: {{ standsData.localization.split("_")[1] }}
      </p>
      <manually-add-stand ref="addStand" />
      <stands-list />
    </div>
    <v-row
      class="mt-10 justify-lg-end fill-height justify-center justify-sm-space-around align-sm-end align-center"
    >
      <v-btn
        id="save-button"
        v-if="!scanning"
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="checkSave"
        >Zapisz</v-btn
      >
      <v-btn
        id="end-scanning-button"
        v-if="scanning"
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="scanning = false"
        >Zakończ</v-btn
      >
      <v-btn
        id="scan-stand-button"
        v-else
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="scanning = true"
        >Zeskanuj kod</v-btn
      >
      <v-btn
        id="cancel-button"
        color="warning"
        x-large
        class="white--text order-last order-sm-first justify-center mr-lg-4 my-2 my-sm-0 flex-shrink-1 flex-sm-shrink-0"
        @click="$router.go(-1)"
        >Wróć</v-btn
      >
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import CodeScanner from "@/components/CodeScanner.vue";
import ManuallyAddStand from "@/components/AdmitStands/ManuallyAddStand.vue";
import StandsList from "@/components/AdmitStands/StandsList.vue";
import { mapState, mapActions } from "vuex";
import axios from "@/axios.js";

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
  components: { CodeScanner, ManuallyAddStand, StandsList },
  data() {
    return {
      scanned: false,
      scanning: false,
      overlay: false,
    };
  },
  computed: {
    ...mapState({
      standsData: (state) => state.standsData,
      stands: (state) => state.stands,
      standBarcode: (state) => state.standBarcode,
      user: (state) => state.user,
    }),
  },
  created() {
    this.scanning = this.action === 2;
  },
  methods: {
    ...mapActions(["assignStands"]),
    async onDecode(decodedText) {
      if (!this.scanned) {
        this.scanned = true;
        const standBarcode = decodedText.includes("STAND:")
          ? decodedText.split(":")[1].trim()
          : decodedText.trim().toUpperCase();
        if (this.stands.includes(standBarcode)) {
          this.$root.manageAlert({
            text: `Stojak ${this.standBarcode} został już dodany`,
            type: "warning",
            time: 1500,
            callback: () => {
              this.scanned = false;
            },
          });
        } else {
          this.assignStands([...this.stands, standBarcode]);
          this.$root.manageAlert({
            text: `Dodano stojak ${this.standBarcode}`,
            type: "success",
            time: 1500,
            callback: () => {
              this.scanned = false;
            },
          });
        }
      }
    },
    async saveStands() {
      this.overlay = true;
      await axios
        .post("api/savestands", {
          ...this.standsData,
          windowStands: this.stands.map((item) => ({ barcode: item })),
          user: this.user.email,
        })
        .then(() => {
          this.assignStands([]);
          this.overlay = false;
          this.$root.manageAlert({
            text: "Pomyślnie dodano stojaki",
            type: "success",
          });
        })
        .catch(() => {
          this.overlay = false;
          this.$root.manageAlert({
            text: "Coś poszło nie tak skontaktuj się z działem IT",
            type: "error",
          });
        });
    },
    checkSave() {
      if (this.standBarcode) {
        this.$refs.addStand.addStand();
      } else {
        this.saveStands();
      }
    },
  },
};
</script>

<style scoped></style>
