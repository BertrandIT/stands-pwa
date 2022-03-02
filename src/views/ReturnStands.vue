<template>
  <v-container fluid class="mt-5">
    <v-row class="mt-5">
      <v-col cols="8">
        <v-text-field
          v-model="standBarcode"
          label="Kod stojaka"
          prepend-inner-icon="mdi-barcode"
          class="mx-3 pt-0"
          clearable
          @keydown.enter="addStand"
          hide-details
          ref="returnstand"
          id="return-stand-barcode"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn
          color="primary"
          @click="addStand"
          class="white--text"
          id="add-return-stand"
          >Dodaj</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <scanned-stands
          :deleteStand="deleteStand"
          :stands="stands"
        ></scanned-stands>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-btn color="warning" @click="cancel" id="cancel-return">Anuluj</v-btn>
        <v-btn class="ml-auto" color="success" @click="save" id="save-return"
          >Zapisz</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScannedStands from "../components/ReturnStands/ScannedStands.vue";
import checkStand from "@/mixins/checkStand";
import axios from "@/axios";

export default {
  mixins: [checkStand],
  components: { ScannedStands },
  data() {
    return {
      standBarcode: null,
      stands: [],
    };
  },
  mounted() {
    this.$refs.returnstand.focus();
  },
  methods: {
    async addStand() {
      const stand = await this.checkStand({
        barcode: (this.standBarcode = this.standBarcode.includes("STAND:")
          ? this.standBarcode.split(":")[1].trim()
          : this.standBarcode.trim().toUpperCase()),
        notAllowedStatuses: ["Zwrócony"],
      });
      if (stand) {
        this.stands.push(stand);
      }
      this.standBarcode = null;
      this.$refs.returnstand.focus();
    },
    deleteStand(standId) {
      const standIndex = this.stands.findIndex((item) => item.id === standId);
      this.stands.splice(standIndex, 1);
    },
    reset() {
      this.standBarcode = null;
      this.stands = [];
    },
    cancel() {
      this.reset();
      this.$router.go(-1);
    },
    async save() {
      if (this.stands.length) {
        const stands = this.stands.map((stand) => stand.id);
        try {
          await axios.post(
            "http://192.168.1.6:8081/api/returnStandsToSupplier",
            {
              user: this.$store.state.user.email,
              stands,
            }
          );
          this.$root.manageAlert({
            text: "Zwrócono zeskanowane stojaki",
            type: "success",
            callback: () => this.reset(),
          });
        } catch (error) {
          console.log(error);
          this.$root.manageAlert({
            text: "Coś poszło nie tak. Zmiany nie zostały zapisane. Skontaktuj się z działem IT.",
            type: "error",
            callback: () => this.reset(),
          });
        }
      } else {
        this.$root.manageAlert({
          text: "Nie zeskanowano żadnego stojaka",
          type: "warning",
        });
      }
    },
  },
};
</script>
