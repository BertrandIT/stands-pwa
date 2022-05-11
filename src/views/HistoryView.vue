<template>
  <div class="history-view">
    <filters-section :sendFiltersToParent="getFilters"></filters-section>
    <stand-list :stands="filteredStands"></stand-list>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import FiltersSection from "@/components/HistoryView/FiltersSection.vue";
import StandList from "@/components/HistoryView/StandList.vue";
import axios from "@/axios";
import loginCheck from "@/mixins/loginCheck";

export default {
  components: { FiltersSection, StandList },
  mixins: [loginCheck],
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
  created() {
    this.getStands();
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
            } else if (filter === "client") {
              passed =
                stand.name &&
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
