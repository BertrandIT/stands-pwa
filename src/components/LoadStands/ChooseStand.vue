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
          v-model="standBarcode"
          label="Kod stojaka"
          prepend-inner-icon="mdi-barcode"
          class="mx-0"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row
      class="justify-lg-end fill-height justify-center justify-sm-space-around flex-sm-row flex-column align-sm-end align-center"
    >
      <v-btn
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="scanning = !scanning"
        >{{ scanning ? "Zakończ" : "Zeskanuj stojak" }}</v-btn
      >
      <v-btn
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        >Zatwierdź</v-btn
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
export default {
  components: {
    CodeScanner,
  },
  data() {
    return { standBarcode: "", scanning: false };
  },
  methods: {
    addStand(barcode = this.standBarcode) {
      return barcode;
    },
  },
};
</script>

<style scoped></style>
