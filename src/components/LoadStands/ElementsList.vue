<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-virtual-scroll
      width="100%"
      :items="standLoad"
      item-height="40"
      :height="($root.windowHeight / 5) * 2"
    >
      <template #default="{ item, index }">
        <div
          class="mt-6"
          style="
            display: flex;
            direction: row;
            font-weight: bold;
            font-size: larger;
          "
        >
          <div style="width: 100%; display: flex">
            <div style="width: 270px">
              {{
                item.description
                  ? `${item.barcode} ${item.description}`
                  : item.barcode
              }}
            </div>
            <div>
              <v-btn
                :id="`delete-element-${index}`"
                @click="deleteElemenet(item)"
                color="red"
                dark
              >
                Usuń
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
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
    deleteElemenet(element) {
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
