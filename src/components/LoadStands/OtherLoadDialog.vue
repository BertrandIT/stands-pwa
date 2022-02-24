<template>
  <v-dialog
    :value="otherLoadDialog"
    transition="dialog-bottom-transition"
    max-width="600"
    @click:outside="closeDialog"
  >
    <template #default>
      <v-card>
        <v-toolbar color="primary" dark>Dodaj inny załadunek </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="3">
              <v-select
                id="order-select"
                v-model="selectedOrder"
                :items="items"
                label="Zlecenie"
                ><template #item="{ item }"
                  ><p :id="item">{{ item }}</p></template
                ></v-select
              >
            </v-col>
            <v-col v-if="selectedOrder !== 'ALU'" cols="12" sm="2">
              <v-text-field
                id="year-input"
                type="numeric"
                v-model="year"
                label="Rok"
              />
            </v-col>
            <v-col cols="12" :sm="selectedOrder !== 'ALU' ? 4 : 5">
              <v-text-field
                id="order-input"
                v-model="order"
                label="Reszta zlecenia"
              />
            </v-col>
            <v-col cols="12" :sm="selectedOrder !== 'ALU' ? 3 : 4">
              <v-text-field
                id="chassis-input"
                type="numeric"
                v-model="chassis"
                label="Pozycja"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="description"
            :label="isWindow ? 'Ilość szyb' : 'Opis'"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn id="dialog-cancel-button" text @click="closeDialog"
            >Anuluj</v-btn
          >
          <v-btn id="dialog-submit-button" text @click="selectOrder"
            >Zatwierdź</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    otherLoadDialog: { type: Boolean, required: true },
    isWindow: { type: Boolean, required: true },
    closeDialog: { type: Function, required: true },
  },
  data() {
    return {
      selectedOrder: "",
      year: "",
      order: "",
      chassis: "",
      description: "",
      items: [
        "ZAM-",
        "Z-P-",
        "ZP-",
        "Z-",
        "ZD-",
        "PAL",
        "ALU",
        "OFR-",
        "OF-",
        "O-",
        "REK-",
        "SRW-",
        "SRX-",
        "SRL-",
        "S-",
        "SDP-",
        "SDR-",
        "SDB-",
        "SDG-",
        "SPG-",
        "SPP-",
        "SPR-",
        "SDL-",
        "BZAM-",
        "BPAL-",
      ],
    };
  },
  computed: {
    ...mapState({
      standLoad: (state) => state.standLoad,
    }),
  },
  methods: {
    ...mapActions(["assignStandLoad"]),
    async selectOrder() {
      if (
        this.selectedOrder === "ALU" &&
        this.order.length != 6 &&
        !this.order.includes("-")
      ) {
        this.$root.manageAlert({
          text: "Zlecenia ALU powinny być w formacie XXX-XX",
          type: "warning",
        });
      } else if (
        this.selectedOrder &&
        this.year &&
        this.order &&
        !(this.isWindow && !this.description)
      ) {
        let newOrder = "";
        if (this.order.includes("AO")) {
          newOrder =
            "AO-" +
            this.order.trim().toUpperCase().split("-")[1].padStart(5, "0");
        }
        await this.addOrder({
          commande:
            this.selectedOrder === "ALU"
              ? newOrder
              : this.selectedOrder +
                this.year +
                "-" +
                this.order.trim().toUpperCase().padStart(5, "0"),
          chassis: this.chassis.padStart(3, "0"),
          description: this.isWindow
            ? `Szyby ${this.description} szt.`
            : this.description,
        }).then(() => {
          this.closeDialog();
        });
      } else {
        this.$root.manageAlert({
          text: "Uzupełnij brakujące dane",
          type: "error",
        });
      }
    },
    async addOrder(data) {
      await axios
        .get(`checkIfCommandeExists?commande=${data.commande}`)
        .then((response) => {
          if (response.data) {
            this.assignStandLoad([
              ...this.standLoad,
              {
                barcode: data.commande + "/" + data.chassis,
                commande: response.data.commande,
                chassis: data.chassis,
                base: response.data.base === "" ? "8" : response.data.base,
                client: response.data.client,
                description: data.description,
                user: "admin",
              },
            ]);
            this.$root.manageAlert({
              text: `Dodano zlecenie ${data.commande}`,
              type: "success",
            });
            this.selectedOrder = "";
            this.year = "";
            this.order = "";
            this.chassis = "";
            this.description = "";
          } else {
            this.$root.manageAlert({
              text: "Podane zlecenie jest nieprawidłowe",
              type: "error",
            });
          }
        });
    },
  },
};
</script>
