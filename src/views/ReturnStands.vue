<template>
  <v-container fluid>
    <v-row>
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
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="addStand" class="white--text"
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
        <v-btn color="warning" @click="cancel">Anuluj</v-btn>
        <v-btn class="ml-auto" color="success" @click="save">Zapisz</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScannedStands from "../components/ReturnStands/ScannedStands.vue";
export default {
  components: { ScannedStands },
  data() {
    return {
      standBarcode: null,
      stands: [],
    };
  },
  methods: {
    addStand() {
      if (this.standBarcode) {
        this.stands.push(this.standBarcode);
        this.standBarcode = null;
      } else {
        this.$root.manageAlert({
          text: "Nie podano barkodu stojaka",
          type: "error",
        });
      }
      this.$refs.returnstand.focus();
    },
    deleteStand(stand) {
      const standIndex = this.stands.findIndex((item) => item === stand);
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
    save() {
      if (this.stands.length) {
        this.$root.manageAlert({
          text: "Zwrócono zeskanowane stojaki",
          type: "info",
          callback: () => this.cancel(),
        });
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
