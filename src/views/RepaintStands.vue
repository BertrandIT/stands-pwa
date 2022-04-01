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
import loginCheck from "@/mixins/loginCheck";

export default {
  mixins: [checkStand, loginCheck],
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
      await this.checkStand(
        (this.standBarcode = this.standBarcode.includes("STAND:")
          ? this.standBarcode.split(":")[1].trim()
          : this.standBarcode.trim().toUpperCase())
      );
      this.standBarcode = null;
      this.$refs.returnstand.focus();
    },
    async checkStand(barcode) {
      if (barcode) {
        const res = await axios.get(`/api/windowStandPwa/${barcode}`);
        if (res.data) {
          var deadline = new Date(res.data.deadline);
          deadline.setMonth(deadline.getMonth() + 2);
          if (
            Math.round(((deadline - new Date()) / 24) * 60 * 60 * 1000) <= 0 &&
            res.data.deadline &&
            res.data.action !== "Zwrócony"
          ) {
            this.$root.manageAlert({
              text: `Pomyślnie załadowano stojak`,
              type: "success",
              time: 1500,
            });
            await this.getBBCode(res.data);
          } else {
            this.$root.manageAlert({
              text: "Podano nie poprawny stojak",
              type: "warning",
              time: 1500,
            });
          }
        } else {
          this.$root.manageAlert({
            text: "Nie znaleziono stojaka o podanym barkodzie",
            type: "error",
          });
        }
      } else {
        this.$root.manageAlert({
          text: "Nie podano barkodu stojaka",
          type: "error",
        });
      }
    },
    async getBBCode(stand) {
      let max = 0;
      if (this.stands.some((item) => item.barcode.includes("BB"))) {
        this.stands.forEach((stand) => {
          if (stand.barcode.includes("BB")) {
            max =
              stand.barcode.split("BB")[1] > max
                ? +stand.barcode.split("BB")[1]
                : max;
          }
        });
        this.stands.push({
          ...stand,
          barcode: `BB${max + 1}`,
          oldBarcode: this.standBarcode,
        });
        this.$root.manageAlert({
          text: `Dodano stojak BB${max + 1}`,
          type: "success",
          time: 1500,
        });
      } else {
        const res = await axios.get(`api/bbstandnumber`);
        this.stands.push({
          ...stand,
          barcode: `BB${res.data[0].num + 1}`,
          oldBarcode: this.standBarcode,
        });
        this.$root.manageAlert({
          text: `Dodano stojak BB${res.data[0].num + 1}`,
          type: "success",
          time: 1500,
        });
      }
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
        try {
          await axios.post("http://127.0.0.1:8081/api/repaintStands", {
            user: this.$store.state.user.email,
            stands: this.stands,
          });
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
