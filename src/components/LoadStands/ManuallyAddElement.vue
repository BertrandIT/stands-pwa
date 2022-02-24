<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-text-field
      id="add-element-input"
      v-model="elementCode"
      label="Kod okna"
      prepend-inner-icon="mdi-barcode"
      class="mx-0"
      clearable
      @keydown.enter="addElement"
      ref="barcodeinput"
    ></v-text-field>
    <v-row style="width: 100% ma-1">
      <v-btn
        id="add-element-button"
        color="primary mx-2"
        large
        @click="addElement"
        class="white--text"
        ><template v-slot:default>
          <v-col>
            <p class="ma-0">Dodaj</p>
            <p class="text-caption ma-0" style="font-size: 2">(tylko barkod)</p>
          </v-col>
        </template></v-btn
      >
      <v-btn
        id="other-load-button"
        color="primary mx-2"
        large
        @click="
          () => {
            otherLoadDialog = true;
            isWindow = false;
          }
        "
        class="white--text"
        >Inne</v-btn
      >
      <v-btn
        id="windows-load-button"
        color="primary mx-2"
        large
        @click="
          () => {
            otherLoadDialog = true;
            isWindow = true;
          }
        "
        class="white--text"
        >Szyby</v-btn
      >
    </v-row>
    <v-dialog
      v-model="chooseOrderDialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <template #default>
        <v-card>
          <v-toolbar color="primary" dark
            >Wybierz zlecenie do podanego okna
          </v-toolbar>
          <v-card-text>
            <v-radio-group v-model="selectedOrderId">
              <v-radio
                v-for="(order, idx) in ordersToChoose"
                :id="`radio-button-${idx}`"
                :key="order.commande"
                :label="`Zlecenie ${order.commande}/${order.chassis}`"
                :value="idx"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn id="submit-button" text @click="selectOrder">Zatwierdź</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <other-load-dialog
      :otherLoadDialog="otherLoadDialog"
      :isWindow="isWindow"
      :closeDialog="() => (otherLoadDialog = false)"
    />
  </v-container>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import OtherLoadDialog from "@/components/LoadStands/OtherLoadDialog.vue";
export default {
  components: {
    OtherLoadDialog,
  },
  data() {
    return {
      elementCode: "",
      ordersToChoose: [],
      chooseOrderDialog: false,
      selectedOrderId: 0,
      otherLoadDialog: false,
      isWindow: false,
    };
  },
  computed: {
    ...mapState({
      standLoad: (state) => state.standLoad,
    }),
  },
  mounted() {
    this.$refs.barcodeinput.focus();
  },
  methods: {
    ...mapActions(["assignStandLoad"]),
    async getDeliveryDate(barcode) {
      await axios.get("api/deliveryDate/" + barcode).then((response) => {
        this.$emit("setDeliveryDate", response.data);
      });
    },
    async addElement() {
      if (this.elementCode) {
        let element = {
          barcode: this.elementCode.trim().toUpperCase(),
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
        .get(`/findbarcodeinallbases?barcode=${barcode}`)
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
                user: "admin",
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
    selectOrder() {
      this.assignStandLoad([
        ...this.standLoad,
        {
          barcode: this.elementCode,
          ...this.ordersToChoose[this.selectedOrderId],
          user: "admin",
        },
      ]);
      this.$root.manageAlert({
        text: `Dodano okno ${this.elementCode} do załadunku`,
        type: "success",
      });
      this.chooseOrderDialog = false;
      this.elementCode = "";
      this.$refs.barcodeinput.focus();
    },
  },
};
</script>
