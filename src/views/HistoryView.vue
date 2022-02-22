<template>
  <div class="history-view">
    <filters :sendFiltersToParent="getFilters"></filters>
    <stand-list :stands="stands"></stand-list>
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
      filters: {},
    };
  },
  async created() {
    await this.getStands();
  },
  methods: {
    async getStands() {
      // const res = await axios.get(
      //   `/standsHistoryPwa?startDate=${startDate}&endDate=${endDate}&localization=${localization}&action=${status}&client=${client}&deadline=${deadline}&standBarcode=${
      //     standBarcode ? standBarcode.trim() : standBarcode
      //   }`
      // );
      const res = await axios.get("/standsHistoryPwa");
      this.stands = res.data;
    },
    getFilters(filters) {
      this.filters = { ...filters };
    },
  },
};
</script>
