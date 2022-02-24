<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
          id="admit-stand-date"
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
          id="status-select"
          :items="statuses"
          id="status"
          label="Status stojaka"
          v-model="selected.action"
          item-text="text"
          item-value="value"
          dense
          hide-details
          style="min-width: 160px"
          ><template #item="{ item }"
            ><p :id="item.id">{{ item.text }}</p></template
          ></v-select
        >
      </v-col>
      <v-col>
        <v-select
          id="localization-select"
          :items="localizations"
          label="Lokalizacja"
          v-model="selected.localization"
          item-text="text"
          item-value="value"
          dense
          hide-details
          style="min-width: 160px"
          ><template #item="{ item }"
            ><p :id="item.id">{{ item.text }}</p></template
          ></v-select
        >
      </v-col>
      <v-col>
        <v-select
          id="deadline-select"
          :items="deadlines"
          label="Deadline"
          v-model="selected.deadline"
          item-text="text"
          item-value="value"
          dense
          hide-details
          style="min-width: 160px"
          ><template #item="{ item }"
            ><p :id="item.id">{{ item.text }}</p></template
          ></v-select
        >
      </v-col>
      <v-col>
        <v-text-field
          id="stand-barcode"
          label="Nr stojaka"
          v-model="barcode"
          dense
          hide-details
          style="min-width: 160px"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          id="client"
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
        <v-btn
          id="filter-button"
          width="100%"
          color="primary"
          @click="filterStands"
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
        { text: "Wszystkie", value: null, id:"Wszystkie_status" },
        { text: "Zwrócony", value: "Zwrócony", id:"Zwrocony" },
        { text: "Gotowy do wysyłki", value: "Gotowy do wysyłki", id:"Gotowy" },
        { text: "Wysłany", value: "Wysłany", id:"Wyslany" },
        { text: "Zmiana lokalizacji", value: "Zmiana lokalizacji", id:"Zmiana" },
        { text: "Przyjęcie na stan", value: "Przyjęcie na stan", id:"Przyjecie" },
      ],
      localizations: [
        { text: "Wszystkie", value: null, id:"Wszystkie_lokalizacja" },
        { text: "PVC", value: "B_PVC", id:"PVC" },
        { text: "ALU", value: "B_ALU", id:"ALU" },
        { text: "DRE", value: "B_DRE", id:"DRE" },
      ],
      deadlines: [
        { text: "Wszystkie", value: null, id:"Wszystkie_deadlines" },
        { text: "Zbliżający się termin", value: 1, id:"Zblizajacy_sie_termin" },
        { text: "Po terminie", value: 2, id:"Po_terminie" },
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
