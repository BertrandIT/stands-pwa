<template>
  <div>
    <v-list width="100%" :height="$root.windowHeight - 230">
      <v-list-item v-for="(item, index) of stands" :key="index">
        <v-list-item-content>{{ item.standBarcode }}</v-list-item-content>
        <v-card
          width="100%"
          @click="toggleSelectStand(item.windowStandId, item.standBarcode)"
          :class="getColor(item.windowStandId)"
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
          <v-card-text>
            <div v-for="(element, idx) of separateItems(item.items)" :key="idx">
              {{ element }}
            </div>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  props: { stands: { type: Array, required: true } },
  data() {
    return {
      selectedStands: [],
      headers: [
        { text: "Stojak", value: "standBarcode" },
        { text: "Klient", value: "name" },
      ],
    };
  },
  methods: {
    toggleSelectStand(standId, standBarcode) {
      const isStandSelectedIndex = this.selectedStands.findIndex(
        (item) => item === standId
      );
      if (isStandSelectedIndex < 0) {
        this.selectedStands.push(standId);
      } else {
        this.selectedStands.splice(isStandSelectedIndex, 1);
      }
    },
    getColor(standId) {
      return this.selectedStands.includes(standId) ? "blue lighten-1" : "white";
    },
    separateItems(items) {
      const tokens = items.split(/[^;];/g);
      return tokens || [];
    },
  },
};
</script>
