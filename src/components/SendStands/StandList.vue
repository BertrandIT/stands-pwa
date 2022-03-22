<template>
  <div>
    <v-row>
      <v-col>
        <v-list
          width="100%"
          :max-height="$root.windowHeight - 230"
          style="overflow-y: scroll"
        >
          <v-list-item v-for="(item, index) of stands" :key="index">
            <v-list-item-content>{{ item.standBarcode }}</v-list-item-content>
            <v-card
              width="100%"
              @click="toggleSelectStand(item.windowStandId, item.standBarcode)"
              :class="getColor(item.windowStandId)"
              class="my-1"
              :id="`select-card-${item.windowStandId}`"
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
                <div
                  v-for="(element, idx) of separateItems(item.items)"
                  :key="idx"
                >
                  {{ element }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  class="ml-auto"
                  small
                  @click="editStand(item)"
                  id="edit-stand"
                  >Edytuj</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-btn color="warning" @click="cancelSendStands" id="cancel-send-stands"
          >Anuluj</v-btn
        >
        <v-btn
          class="ml-auto"
          color="success"
          @click="sendSelectedStands"
          id="send-stands"
          >Wyślij zaznaczone</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="editDialog.visibility">
      <edit-stand
        :windowStandId="editDialog.windowStandId"
        :standBarcode="editDialog.standBarcode"
        :items="editDialog.items"
        :closeDialog="closeDialog"
      ></edit-stand>
    </v-dialog>
  </div>
</template>
<script>
import EditStand from "@/components/SendStands/EditStand.vue";
import axios from "@/axios";

export default {
  components: { EditStand },
  props: {
    stands: { type: Array, required: true },
    getStands: { type: Function, required: true },
    cancelSendStands: { type: Function, required: true },
  },
  data() {
    return {
      selectedStands: [],
      headers: [
        { text: "Stojak", value: "standBarcode" },
        { text: "Klient", value: "name" },
      ],
      editDialog: {
        visibility: false,
        windowStandId: 0,
        standBarcode: "",
        items: [],
      },
    };
  },
  methods: {
    toggleSelectStand(standId) {
      if (this.editDialog.windowStandId !== standId) {
        const isStandSelectedIndex = this.selectedStands.findIndex(
          (item) => item === standId
        );
        if (isStandSelectedIndex < 0) {
          this.selectedStands.push(standId);
        } else {
          this.selectedStands.splice(isStandSelectedIndex, 1);
        }
      }
    },
    getColor(standId) {
      return this.selectedStands.includes(standId) ? "blue lighten-1" : "white";
    },
    separateItems(items) {
      const tokens = items.split(/[^;];/g);
      return tokens || [];
    },
    async getStandItems(windowStandId) {
      const res = await axios.get(`/api/standItems/${windowStandId}`);
      return res.data.length ? res.data : [];
    },
    async editStand(item) {
      const { windowStandId, standBarcode } = item;
      this.editDialog = {
        ...this.editDialog,
        windowStandId,
        standBarcode,
      };
      this.editDialog.items = await this.getStandItems(windowStandId);
      this.editDialog.visibility = true;
    },
    async closeDialog(retrieveStands = null) {
      this.editDialog = {
        visibility: false,
        windowStandId: 0,
        standBarcode: "",
        items: [],
      };
      if (retrieveStands) {
        await this.getStands();
      }
    },
    async sendSelectedStands() {
      if (this.selectedStands.length) {
        const sentStands = this.selectedStands.map((standId) => {
          const stand = this.stands.find(
            (item) => item.windowStandId === standId
          );
          console.log(stand);
          return {
            user: this.$store.state.user.email,
            windowStandId: stand.windowStandId,
            client: stand.client,
            base: stand.base === "" ? "8" : stand.base,
            load_number: stand.load_number,
          };
        });
        await axios.post("api/sendStands", {
          sentStands,
        });
        this.selectedStands = [];
        this.getStands();
        this.$root.manageAlert({
          text: "Wysłano wybrane stojaki.",
          type: "info",
        });
        // {sentStands: [{windowStandId, client, load_number, user, base(zamień "8" na "")}]}
      } else {
        this.$root.manageAlert({
          text: "Nie wybrano żadnego stojaka",
          type: "warning",
        });
      }
    },
  },
};
</script>
