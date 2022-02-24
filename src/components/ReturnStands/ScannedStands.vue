<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-card-subtitle>Zeskanowane stojaki</v-card-subtitle>
    <v-virtual-scroll
      width="100%"
      :items="stands"
      item-height="40"
      :height="$root.windowHeight - 250"
    >
      <template v-slot:default="{ item }">
        <v-list-item :key="item">
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 mt-4 font-weight-bold text-uppercase"
              v-text="item"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn x-large @click="deleteStand(item)" icon>
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
