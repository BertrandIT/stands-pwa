<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="newStandBarcode"
        label="Kod stojaka"
        prepend-inner-icon="mdi-barcode"
        class="mx-3 pt-0"
        clearable
        @keydown.enter="addStand"
        hide-details
        ref="newstand"
        id="new-stand-barcode"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(item, idx) of items" :key="idx">
          <v-card
            width="100%"
            @click="toggleSelectItem(item.id)"
            :class="getColor(item.id)"
            class="my-1"
            :id="`select-stand-item-${item.id}`"
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
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="cancel" id="cancel-edit-stand-items">Anuluj</v-btn>
      <v-btn
        class="ml-auto"
        @click="moveItemsToNewStand"
        id="save-edit-stand-items"
        >Przenieś na nowy stojak</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    windowStandId: { type: Number, required: true },
    standBarcode: { type: String, required: true },
    items: { type: Array, required: true },
    closeDialog: { type: Function, required: true },
  },
  data() {
    return {
      selectedItems: [],
      headers: [
        { text: "Barkod", value: "barcode" },
        { text: "Zlecenie", value: "commande" },
        { text: "Klient", value: "name" },
      ],
      newStandBarcode: "",
    };
  },
  methods: {
    addStand() {
      //check if stand exists and is free to load
    },
    toggleSelectItem(id) {
      const isItemSelectedIndex = this.selectedItems.findIndex(
        (item) => item === id
      );
      if (isItemSelectedIndex < 0) {
        this.selectedItems.push(id);
      } else {
        this.selectedItems.splice(isItemSelectedIndex, 1);
      }
    },
    getColor(id) {
      return this.selectedItems.includes(id) ? "blue lighten-1" : "white";
    },
    moveItemsToNewStand() {
      this.closeDialog();
    },
    cancel() {
      this.newStandBarcode = "";
      this.selectedItems = [];
      this.closeDialog();
    },
  },
};
</script>
