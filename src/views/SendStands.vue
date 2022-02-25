<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          id="send-stands-search"
          v-model="search"
          label="Szukaj po kliencie, nr stojaka lub zleceniu"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <stand-list :stands="filteredStands"></stand-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-btn color="warning" @click="cancel" id="cancel-send-stands"
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
  </v-container>
</template>
<script>
import axios from "@/axios";
import StandList from "@/components/SendStands/StandList.vue";

export default {
  components: { StandList },
  data() {
    return {
      stands: [],
      search: "",
    };
  },
  computed: {
    filteredStands() {
      if (this.search) {
        const search = this.search.toLowerCase().trim();
        return this.stands.filter((stand) => {
          const checkBarcode = stand.standBarcode
            .toLowerCase()
            .includes(search);
          const checkClientName =
            stand.name && stand.name.toLowerCase().includes(search);
          const checkItems =
            stand.items && stand.items.toLowerCase().includes(search);
          return checkBarcode || checkClientName || checkItems;
        });
        // edytuj stojak zaznacz elementy - pobierz nowy stojak - sprawdź czy nie wysłany/zwrócony - przerzuć
      }
      return this.stands;
    },
  },
  async beforeMount() {
    await this.getStandsReadyToGo();
  },
  methods: {
    async getStandsReadyToGo() {
      const res = await axios.get("/api/standsReadyToGo");
      this.stands = res.data;
    },
    sendSelectedStands() {
      // wyślij stojaki backendTask
      console.log("sendStands");
    },
    cancel() {
      this.stands = [];
      this.search = "";
      this.$router.go(-1);
    },
  },
};
</script>
