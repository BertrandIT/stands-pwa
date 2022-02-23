<template>
  <div>
    <v-card width="100%" class="px-5">
      <v-card-title class="d-flex justify-space-between">
        <span
          :class="{ 'text-subtitle-2': idx === 0, 'text-body-2': idx !== 0 }"
          v-for="(head, idx) of headers"
          :key="idx"
          >{{ head.text }}</span
        >
      </v-card-title>
    </v-card>
    <v-virtual-scroll
      width="100%"
      :items="stands"
      item-height="40"
      :height="$root.windowHeight - 230"
    >
      <template v-slot="{ item }">
        <v-list-item>
          <v-list-item-content>{{ item.barcode }}</v-list-item-content>
          <v-card
            width="100%"
            @click="goToStandDetails(item.id, item.barcode)"
            :class="getColor(item.action)"
            class="my-1"
          >
            <v-card-title class="d-flex justify-space-between py-2">
              <span
                style="min-width: 100px"
                :class="{
                  'text-subtitle-2': idx === 0,
                  'text-body-2': idx !== 0,
                }"
                v-for="(head, idx) of headers"
                :key="idx"
                >{{ item[head.value] || "Brak" }}</span
              >
            </v-card-title>
          </v-card>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </div>
</template>
<script>
export default {
  props: { stands: { type: Array, required: true } },
  data() {
    return {
      headers: [
        { text: "Stojak", value: "barcode" },
        { text: "Przyjęty", value: "admitDate" },
        { text: "Deadline", value: "deadline" },
        { text: "Status", value: "action" },
        { text: "Lokalizacja", value: "localization" },
      ],
    };
  },
  methods: {
    goToStandDetails(standId, standBarcode) {
      this.$router.push(`/viewHistory/${standId}/${standBarcode}`);
    },
    getColor(status) {
      if (status == "Przyjęcie na stan" || status === "Zmiana lokalizacji") {
        return "blue";
      }
      if (status == "Gotowy do wysyłki") {
        return "green";
      }
      if (status == "Wysłany") {
        return "amber";
      }
      if (status == "Zwrócony") {
        return "grey";
      }
    },
  },
};
</script>
