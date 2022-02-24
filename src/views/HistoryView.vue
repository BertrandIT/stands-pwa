<template>
  <div class="history-view">
    <filters :sendFiltersToParent="getFilters"></filters>
    <stand-list :stands="filteredStands"></stand-list>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import Filters from "@/components/HistoryView/Filters.vue";
import StandList from "@/components/HistoryView/StandList.vue";
import axios from "@/axios";

export default {
  components: { Filters, StandList },
  data() {
    return {
      stands: [],
      filters: {
        admitDate: null,
        localization: null,
        action: null,
        client: null,
        deadline: null,
        barcode: null,
      },
      overlay: false,
    };
  },
  computed: {
    filteredStands() {
      const filters = Object.keys(this.filters);
      return this.stands.filter((stand) => {
        let passed = true;
        filters.forEach((filter) => {
          if (this.filters[filter]) {
            if (!["barcode", "client"].includes(filter)) {
              passed = stand[filter] === this.filters[filter] && passed;
            } else if (filter === "barcode") {
              passed =
                stand.barcode
                  .toLowerCase()
                  .trim()
                  .includes(this.filters.barcode.toLowerCase().trim()) &&
                passed;
            } else if (filter === "client" && stand.name && stand.name.length) {
              passed =
                stand.name
                  .toLowerCase()
                  .trim()
                  .includes(this.filters[filter].toLowerCase().trim()) &&
                passed;
            }
          }
        });
        return passed;
      });
    },
  },
  async created() {
    await this.getStands();
    console.log(this.filteredStands)
  },
  methods: {
    async getStands() {
      // const res = await axios.get(
      //   `/standsHistoryPwa?startDate=${startDate}&endDate=${endDate}&localization=${localization}&action=${status}&client=${client}&deadline=${deadline}&standBarcode=${
      //     standBarcode ? standBarcode.trim() : standBarcode
      //   }`
      // );
      this.overlay = true;
      const res = await axios.get("/api/standsHistoryPwa");
      this.stands = res.data;
      this.overlay = false;
    },
    getFilters(filters) {
      this.filters = { ...filters };
    },
  },
};
</script>
