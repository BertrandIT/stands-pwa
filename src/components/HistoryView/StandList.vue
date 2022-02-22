<template>
  <v-virtual-scroll
    width="100%"
    :items="stands"
    item-height="50"
    height="310px"
  >
    <template v-slot="{ item }">
      <v-list-item>
        <v-list-item-content>{{ item.barcode }}</v-list-item-content>
      </v-list-item>
    </template>
  </v-virtual-scroll>
</template>
<script>
export default {
  props: { stands: { type: Array, required: true } },
  data() {
    return {};
  },
};
</script>
