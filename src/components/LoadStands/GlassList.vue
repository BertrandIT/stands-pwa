<template>
  <div>
    <v-row>
      <v-col>
        <v-list width="100%" style="overflow-y: scroll">
          <v-list-item v-for="(item, index) of glasses" :key="index">
            <v-card
              width="100%"
              @click="toggleSelect(item)"
              :class="getColor(item.id)"
              class="my-1"
              :id="`select-card-${item.id}`"
            >
              <v-card-title class="d-flex justify-space-between py-2">
                {{ item.commande }} / {{ item.chassis }}
              </v-card-title>
              <v-card-text>
                <div>
                  {{ item.description }}
                </div>
                <div>{{ item.width }} x {{ item.height }}</div>
              </v-card-text>
            </v-card>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    glasses: { type: Array, required: true },
  },
  data() {
    return {
      selectedGlasses: [],
    };
  },
  methods: {
    toggleSelect(item) {
      const foundIdx = this.selectedGlasses.findIndex(
        (glass) => glass.id === item.id
      );
      if (foundIdx < 0) {
        this.selectedGlasses.push({
          id: item.id,
          table: item.table,
        });
      } else {
        this.selectedGlasses.splice(foundIdx, 1);
      }
    },
    getColor(id) {
      return this.selectedGlasses.find((el) => el.id === id)
        ? "blue lighten-1"
        : "white";
    },
  },
};
</script>
