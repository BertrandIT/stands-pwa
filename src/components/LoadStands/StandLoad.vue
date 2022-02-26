<template>
  <v-container fluid class="align-start">
    <p class="text-h5 mt-2 font-weight-bold text-uppercase">
      Załadunek stojaka: {{ standToLoad.barcode }}
    </p>
    <p v-if="deliverydate" class="text-subtitle-2 mt-2 text-uppercase">
      Data dostawy: {{ deliverydate }}
    </p>
    <code-scanner v-if="scanning" @decode="addElement" />
    <manually-add-element @setDeliveryDate="(e) => (deliverydate = e)" />
    <elements-list />
    <v-row
      class="justify-lg-end fill-height justify-center justify-sm-space-around flex-sm-row flex-column align-sm-end align-center"
    >
      <v-btn
        id="scanner-button"
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="scanning = !scanning"
        >{{ scanning ? "Zakończ" : "Zeskanuj stojak" }}</v-btn
      >
      <v-btn
        id="submit-button"
        color="success"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="() => saveLoad()"
        >Zatwierdź</v-btn
      >
      <v-btn
        id="cancel-button"
        color="warning"
        x-large
        class="white--text justify-center mr-lg-4 my-2 my-sm-0 flex-shrink-1 flex-sm-shrink-0 order-last order-sm-first"
        @click="
          () => {
            $router.go(-1);
            clearStandToLoad();
          }
        "
        >Wróć</v-btn
      >
    </v-row>
  </v-container>
</template>
<script>
// @ is an alias to /src
import ManuallyAddElement from "@/components/LoadStands/ManuallyAddElement.vue";
import ElementsList from "@/components/LoadStands/ElementsList.vue";
import CodeScanner from "@/components/CodeScanner.vue";
import { mapState, mapActions } from "vuex";
import axios from "@/axios";

export default {
  components: { ManuallyAddElement, ElementsList, CodeScanner },
  data() {
    return {
      scanning: false,
      deliverydate: "",
    };
  },
  computed: {
    ...mapState({
      standToLoad: (state) => state.standToLoad,
      standLoad: (state) => state.standLoad,
      deleted: (state) => state.deleted,
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions(["assignStandLoad", "assignStandToLoad", "clearStandToLoad"]),
    async addElement(elementCode) {
      if (elementCode) {
        let element = {
          barcode: elementCode.trim().toUpperCase(),
        };
        if (this.elementAlreadyAdded(element.barcode)) {
          this.$root.manageAlert({
            text: `Okno ${this.elementCode} zostało już dodane`,
            type: "warning",
            time: 1500,
          });
          this.elementCode = "";
          this.$refs.barcodeinput.focus();
        } else {
          await this.getWholeOrderForBarcode(element.barcode);
        }
      }
    },
    elementAlreadyAdded(barcode) {
      var found = false;
      this.standLoad.forEach((item) => {
        item.barcode === barcode ? (found = true) : null;
      });
      return found;
    },
    async getWholeOrderForBarcode(barcode) {
      await axios
        .get(`/api/findBarcodeInAllBasesPwa?barcode=${barcode}`)
        .then((response) => {
          if (response.data.length == 1) {
            this.getDeliveryDate(barcode);
            this.assignStandLoad([
              ...this.standLoad,
              {
                barcode: barcode,
                commande: response.data[0].commande,
                chassis: response.data[0].chassis,
                base:
                  response.data[0].winpro === ""
                    ? "8"
                    : response.data[0].winpro,
                client: response.data[0].client,
                user: this.user.email,
              },
            ]);
            this.$root.manageAlert({
              text: `Dodano okno ${this.elementCode} do załadunku`,
              type: "success",
            });
            this.elementCode = "";
            this.$refs.barcodeinput.focus();
          } else if (response.data.length > 1) {
            this.getDeliveryDate(barcode);
            this.ordersToChoose = response.data;
            this.chooseOrderDialog = true;
          } else {
            this.$root.manageAlert({
              text: `Podany kod: ${this.elementCode} jest niepoprawny. Sprawdź poprawność kodu i spróbuj ponownie`,
              type: "error",
            });
          }
        });
    },
    async saveLoad() {
      if (this.standToLoad.wasEmpty) {
        await this.sendEmptyStand();
      } else {
        await this.editStandLoad();
      }
    },
    async sendEmptyStand() {
      await axios
        .patch(`api/massStandLoad/${this.standToLoad.id}`, {
          storedItems: this.standLoad,
        })
        .then(() => {
          this.$root.manageAlert({
            text: `Pomyślnie załadowano stojak`,
            type: "success",
          });
          this.clearStandToLoad();
          this.assignStandLoad([]);
        })
        .catch(() => {
          this.$root.manageAlert({
            text: `Sprawdź połączenie z Internetem, bądź skontaktuj się z działem IT`,
            type: "error",
          });
        });
    },
    async editStandLoad() {
      await axios
        .patch(`api/updateLoad/${this.standToLoad.id}`, {
          items: this.standLoad,
          deleted: this.deleted,
          user: this.user.email,
        })
        .then(() => {
          this.$root.manageAlert({
            text: `Pomyślnie załadowano stojak`,
            type: "success",
          });
          this.clearStandToLoad();
          this.assignStandLoad([]);
        })
        .catch(() => {
          this.$root.manageAlert({
            text: `Sprawdź połączenie z Internetem, bądź skontaktuj się z działem IT`,
            type: "error",
          });
        });
    },
  },
};
</script>
