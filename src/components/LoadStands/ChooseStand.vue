<template>
  <v-container
    fluid
    class="align-start flex-row justify-center"
    style="height: 50%"
  >
    <p class="text-center text-h5 mt-4 font-weight-bold text-uppercase">
      Załadunek stojaka
    </p>
    <p class="text-center text-subtitle-1 mt-4 text-uppercase">Podaj stojak</p>
    <v-row>
      <code-scanner @decode="addStand" v-if="scanning" />
      <v-col v-else>
        <v-text-field
          id="choose-stand-input"
          v-model="standBarcode"
          label="Kod stojaka"
          prepend-inner-icon="mdi-barcode"
          class="mx-0"
          clearable
          @keydown.enter="() => addStand()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row
      class="justify-lg-end fill-height justify-center justify-sm-space-around flex-sm-row flex-column align-sm-end align-center"
    >
      <!-- <v-btn
        id="scanner-button"
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="scanning = !scanning"
        >{{ scanning ? "Zakończ" : "Zeskanuj stojak" }}</v-btn
      > -->
      <v-btn
        id="submit-button"
        color="success"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="() => addStand()"
        >Zatwierdź</v-btn
      >
      <v-btn
        id="cancel-button"
        color="warning"
        x-large
        class="white--text justify-center mr-lg-4 my-2 my-sm-0 flex-shrink-1 flex-sm-shrink-0 order-last order-sm-first"
        @click="$router.go(-1)"
        >Wróć</v-btn
      >
    </v-row>
    <v-dialog
      v-model="dialog.value"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <template #default>
        <v-card>
          <v-toolbar color="primary" dark>{{ dialog.title }} </v-toolbar>
          <v-card-text>
            <p class="pa-2">{{ dialog.text }}</p>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn id="no-button" text @click="dialog.value = false">Nie</v-btn>
            <v-btn id="yes-button" text @click="dialog.submitAction">Tak</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import CodeScanner from "@/components/CodeScanner.vue";
import axios from "@/axios.js";
import { mapActions, mapState } from "vuex";
import calcDaysLeft from "@/mixins/calcDaysLeft.js";
export default {
  mixins: [calcDaysLeft],
  components: {
    CodeScanner,
  },
  data() {
    return {
      standBarcode: "",
      scanning: false,
      dialog: {
        value: false,
      },
      standToLoad: {},
      otherLoadDialog: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions(["assignStandToLoad", "assignStandLoad"]),
    async addStand(standBarcode = null) {
      const barcode = this.handleBarcode(standBarcode);
      await axios.get("api/windowStand/" + barcode).then((response) => {
        const daysleft = this.calcDeadline(response.data.deadline);
        if (response.data === "Item not found") {
          this.$root.manageAlert({
            text: "Nie można wykorzystać stojaka, stojak nie istnieje",
            type: "warning",
          });
        } else if (
          response.data.action == "Wysłany" ||
          response.data.action == "Zwrócony"
        ) {
          this.$root.manageAlert({
            text:
              "Nie można wykorzystać stojaka, stojak został już " +
              response.data.action.toLowerCase(),
            type: "warning",
          });
        } else if (
          !(
            response.data.action == "Zmiana lokalizacji" ||
            response.data.action == "Przyjęcie na stan"
          )
        ) {
          this.dialog = {
            value: true,
            title: "Stojak jest już załadowany",
            text: "Czy chcesz edytować załadunek?",
            submitAction: this.editLoad,
          };
          this.standToLoad = {
            barcode,
            ...response.data,
            wasEmpty: false,
          };
        } else if (!isNaN(daysleft) && daysleft <= new Date()) {
          this.deadlineExceeded({
            barcode,
            ...response.data,
            wasEmpty: true,
          });
        } else {
          this.assignStandToLoad({
            barcode,
            ...response.data,
            wasEmpty: true,
          });
        }
      });
    },
    handleBarcode(barcode) {
      const standBarcode = barcode ? barcode : this.standBarcode;
      return standBarcode.includes("STAND:")
        ? standBarcode.split(":")[1].trim()
        : standBarcode.trim().toUpperCase();
    },
    async editLoad() {
      this.assignStandToLoad(this.standToLoad);
      await this.getLoadInfo(this.standToLoad.id);
    },
    deadlineExceeded(stand) {
      if (this.user.deadlineOverride) {
        this.dialog = {
          value: true,
          title: "Przekroczono deadline".toUpperCase(),
          text: "Czy chcesz na pewno chcesz kontynuować załadunek?",
          submitAction: () => {
            this.assignStandToLoad(stand);
          },
        };
      } else {
        this.$root.manageAlert({
          text: `Nie można załadować stojak, ponieważ deadline został przekroczony`,
          type: "error",
          time: 2000,
        });
      }
    },
    async getLoadInfo(id) {
      await axios
        .get("api/lastload/" + id)
        .then((response) => {
          this.assignStandLoad(
            response.data.map((win) => ({
              ...win,
              barcode:
                win.barcode === win.commande
                  ? win.barcode + "/" + win.chassis
                  : win.barcode,
              user: this.user.email,
            }))
          );
        })
        .catch((err) => {
          console.log(err);
          this.$root.manageAlert({
            text: "Sprawdź połączenie z Internetem, bądź skontaktuj się z działem IT222",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped></style>
