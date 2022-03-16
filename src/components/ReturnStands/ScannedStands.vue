<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-card-subtitle class="mb-0 pb-0">Zeskanowane stojaki</v-card-subtitle>
    <v-card-subtitle class="mb-0 pb-0"
      >Ilość stojaków: {{ stands.length }}</v-card-subtitle
    >
    <v-virtual-scroll
      width="100%"
      :items="stands"
      item-height="40"
      :height="$root.windowHeight - 295"
    >
      <template v-slot:default="{ item, index }">
        <v-list-item :key="item.id">
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 mt-4 font-weight-bold text-uppercase"
              v-text="item.barcode"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              x-large
              @click="deleteStand(item.id)"
              icon
              :id="`delete-from-return-${index}`"
            >
              <v-icon color="red lighten-1">mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-virtual-scroll>
  </v-container>
</template>
<script>
export default {
  props: {
    stands: { type: Array, required: true },
    deleteStand: { type: Function, required: true },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
