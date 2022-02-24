<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
          label="Data przyjęcia"
          type="date"
          v-model="admitDate"
          dense
          hide-details
          style="min-width: 160px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          :items="statuses"
          label="Status stojaka"
          v-model="selected.action"
          item-text="text"
          item-value="value"
          dense
          hide-details
          style="min-width: 160px"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="localizations"
          label="Lokalizacja"
          v-model="selected.localization"
          item-text="text"
          item-value="value"
          dense
          hide-details
          style="min-width: 160px"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="deadlines"
          label="Deadline"
          v-model="selected.deadline"
          item-text="text"
          item-value="value"
          dense
          hide-details
          style="min-width: 160px"
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          label="Nr stojaka"
          v-model="barcode"
          dense
          hide-details
          style="min-width: 160px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Klient"
          v-model="client"
          dense
          hide-details
          style="min-width: 160px"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn width="100%" color="primary" @click="filterStands"
          >Filtruj</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: { sendFiltersToParent: { type: Function, required: true } },
  data() {
    return {
      admitDate: null,
      client: "",
      barcode: "",
      selected: {
        deadline: null,
        action: null,
        localization: null,
      },
      statuses: [
        { text: "Wszystkie", value: null },
        { text: "Zwrócony", value: "Zwrócony" },
        { text: "Gotowy do wysyłki", value: "Gotowy do wysyłki" },
        { text: "Wysłany", value: "Wysłany" },
        { text: "Zmiana lokalizacji", value: "Zmiana lokalizacji" },
        { text: "Przyjęcie na stan", value: "Przyjęcie na stan" },
      ],
      localizations: [
        { text: "Wszystkie", value: null },
        { text: "PVC", value: "B_PVC" },
        { text: "ALU", value: "B_ALU" },
        { text: "DRE", value: "B_DRE" },
      ],
      deadlines: [
        { text: "Wszystkie", value: null },
        { text: "Zbliżający się termin", value: 1 },
        { text: "Po terminie", value: 2 },
      ],
    };
  },
  methods: {
    filterStands() {
      this.sendFiltersToParent({
        ...this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        client: this.client,
        barcode: this.barcode,
      });
    },
  },
};
</script>
