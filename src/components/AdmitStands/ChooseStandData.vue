<template>
  <v-container
    fluid
    class="align-start flex-row justify-center"
    style="height: 50%"
  >
    <p class="text-center text-h5 mt-4 font-weight-bold text-uppercase">
      Przyjęcie stojaków
    </p>
    <v-row>
      <v-col>
        <v-select
          id="localization-select"
          :items="localizations"
          item-text="label"
          item-value="value"
          label="Lokalizacja"
          @change="
            (event) => {
              this.$emit('setData', { value: event, key: 'localization' });
            }
          "
          ><template #item="{ item }"
            ><p :id="item.label">{{ item.label }}</p></template
          ></v-select
        >
        <v-select
          id="supplier-select"
          :items="suppliers"
          item-text="label"
          item-value="value"
          label="Dostawca"
          @change="
            (event) => {
              this.$emit('setData', { value: event, key: 'supplier' });
            }
          "
          ><template #item="{ item }"
            ><p :id="item.label">{{ item.label }}</p></template
          ></v-select
        >
        <v-checkbox
          label="Własny stojak"
          @change="
            (event) => {
              this.$emit('setData', { value: event, key: 'ownStand' });
            }
          "
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row
      class="justify-lg-end fill-height justify-center justify-sm-space-around flex-sm-row flex-column align-sm-end align-center"
    >
      <v-btn
        id="manually-add-stand"
        color="primary"
        x-large
        class="white--text justify-center my-2 my-sm-0 mr-lg-4 flex-shrink-1 flex-sm-shrink-0"
        @click="$emit('changeAction', 1)"
        >Wprowadź kod</v-btn
      >
      <v-btn
        id="scan-stand"
        color="primary"
        x-large
        class="white--text justify-center mr-lg-4 my-2 my-sm-0 flex-shrink-1 flex-sm-shrink-0"
        @click="$emit('changeAction', 2)"
        >Zeskanuj kod</v-btn
      >
      <v-btn
        color="warning"
        id="cancel"
        x-large
        class="white--text order-last order-sm-first justify-center mr-lg-4 my-2 my-sm-0 flex-shrink-1 flex-sm-shrink-0"
        @click="$router.go(-1)"
        >Wróć</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "choose-stand-data",

  data() {
    return {
      localizations: [
        { label: "PVC", value: "B_PVC" },
        { label: "Alu", value: "B_ALU" },
        { label: "Drewno", value: "B_DRE" },
      ],
      suppliers: [
        { label: "PG", value: "PG" },
        { label: "IGP", value: "IGP" },
        { label: "GLASSOLUTIONS", value: "GLASSOLUTIONS" },
        { label: "INNY", value: "INNY" },
      ],
    };
  },
  methods: {
    setData(event, key) {
      this.$emit("setData", key, event);
    },
  },
};
</script>

<style scoped></style>
