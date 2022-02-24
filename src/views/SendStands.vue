<template>
  <div>
    <stand-list :stands="stands"></stand-list>
  </div>
</template>
<script>
import axios from "@/axios";
import StandList from "@/components/SendStands/StandList.vue";

export default {
  components: { StandList },
  data() {
    return {
      stands: [],
    };
  },
  async beforeMount() {
    await this.getStandsReadyToGo();
  },
  methods: {
    async getStandsReadyToGo() {
      const res = await axios.get("/api/standsReadyToGo");
      this.stands = res.data;
    },
  },
};
</script>
