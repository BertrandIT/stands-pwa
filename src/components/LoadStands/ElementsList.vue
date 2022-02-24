<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-virtual-scroll
      width="100%"
      :items="standLoad"
      item-height="40"
      :height="($root.windowHeight / 5) * 2"
    >
      <template #default="{ item, idx }">
        <v-list-item :key="idx">
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 mt-4 font-weight-bold text-uppercase"
              v-text="
                item.description
                  ? `${item.barcode} ${item.description}`
                  : item.barcode
              "
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      standLoad: (state) => state.standLoad,
      deleted: (state) => state.deleted,
    }),
  },
  methods: {
    ...mapActions(["assignStandLoad", "assignDeleted"]),
    deleteStand(element) {
      const newData = [...this.standLoad];
      const prevIndex = this.standLoad.findIndex((item) => item === element);
      if (Object.prototype.hasOwnProperty.call(element, "id")) {
        this.assignDeleted([...this.deleted, { id: element.id }]);
      }
      newData.splice(prevIndex, 1);
      this.assignStandLoad(newData);
    },
  },
};
</script>
