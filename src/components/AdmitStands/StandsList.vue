<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <v-virtual-scroll
      width="100%"
      :items="stands"
      item-height="50"
      :height="($root.windowHeight / 5) * 2"
    >
      <template v-slot:default="{ item, index }">
        <v-list-item :key="item.barcode">
          <v-list-item-content>
            <v-list-item-title
              class="text-h6 mt-16 font-weight-bold text-uppercase"
              v-text="item.barcode"
            ></v-list-item-title>
            <v-list-item-subtitle class="text-subtitle-1 text-uppercase"
              ><p
                v-if="item.daysleft"
                :class="
                  item.daysleft <= 0
                    ? 'red--text font-weight-bold text--lighten-1'
                    : null
                "
              >
                {{
                  isNaN(item.daysleft)
                    ? item.daysleft
                    : `Deadline za ${item.daysleft} dni`
                }}
              </p></v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              :id="`delete-stand-${index}`"
              x-large
              @click="deleteStand(item)"
              icon
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      stands: (state) => state.stands,
    }),
  },
  methods: {
    ...mapActions(["assignStands"]),
    deleteStand(stand) {
      const newData = [...this.stands];
      const prevIndex = this.stands.findIndex((item) => item === stand);
      newData.splice(prevIndex, 1);
      this.assignStands(newData);
    },
  },
};
</script>
