<template>
  <v-container fluid>
    <v-alert
      :value="alert.trigger"
      :type="alert.type"
      dismissible
      style="position: absolute; z-index: 4"
      transition="slide-x-transition"
    >
      {{ alert.msg }}
    </v-alert>
    <code-scanner @decode="onDecode" v-if="action === 2" />
    <div v-else>
      <p class="text-h5 mt-4 font-weight-bold text-uppercase">
        Lokalizacja: {{ standsData.localization.split("_")[1] }}
      </p>
      <manually-add-stand />
      <stands-list />
    </div>
    <v-row
      class="mt-10 justify-lg-end fill-height justify-center justify-sm-space-around align-sm-end align-center"
    >
      <v-btn
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="saveStands"
        >Zapisz</v-btn
      >
      <v-btn
        color="blue darken-4"
        x-large
        class="white--text justify-center mr-lg-4 my-2 my-sm-0 flex-shrink-1 flex-sm-shrink-0"
        @click="$router.go(-1)"
        >Wróć</v-btn
      >
    </v-row>
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
      alert: {
        trigger: false,
      },
    };
  },
  computed: {
    ...mapState({
      standsData: (state) => state.standsData,
      stands: (state) => state.stands,
    }),
  },
  methods: {
    ...mapActions(["assignStands"]),
    onDecode(decodedText) {
      if (!this.scanned) {
        this.scanned = true;
        const standBarcode = decodedText.includes("STAND:")
          ? decodedText.split(":")[1].trim()
          : decodedText.trim().toUpperCase();
        if (this.stands.includes(standBarcode)) {
          this.alert.msg = `Stojak ${standBarcode} został już dodany`;
          this.alert.type = "warning";
          this.alert.trigger = true;
          setTimeout(() => {
            this.alert.trigger = false;
            this.scanned = false;
          }, 1500);
        } else {
          this.assignStands([...this.stands, standBarcode]);
          this.alert.msg = `Dodano stojak ${standBarcode}`;
          this.alert.type = "success";
          this.alert.trigger = true;
          setTimeout(() => {
            this.alert.trigger = false;
            this.scanned = false;
          }, 1500);
        }
      }
    },
    async saveStands() {
      await axios
        .post("api/savestands", {
          ...this.standsData,
          windowStands: this.stands.map((item) => ({ barcode: item })),
          user: "admin",
        })
        .then(() => {
          this.alert.msg = "Pomyślnie dodano stojaki";
          this.alert.type = "success";
          this.alert.trigger = true;
          setTimeout(() => {
            this.alert.trigger = false;
          }, 3000);
        })
        .catch(() => {
          this.alert.msg = "Coś poszło nie tak skontaktuj się z działem IT";
          this.alert.type = "error";
          this.alert.trigger = true;
          setTimeout(() => {
            this.alert.trigger = false;
          }, 3000);
        });
    },
  },
};
</script>

<style scoped></style>
