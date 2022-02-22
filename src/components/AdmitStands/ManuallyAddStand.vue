<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-text-field
      v-model="standBarcode"
      label="Kod stojaka"
      prepend-inner-icon="mdi-barcode"
      class="mx-0"
      clearable
    ></v-text-field>
    <v-btn color="primary" class="white--text">Dodaj</v-btn>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      standBarcode: "",
    };
  },
};
</script>
