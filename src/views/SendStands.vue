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
    <stand-list
      :stands="filteredStands"
      :getStands="getStandsReadyToGo"
      :cancelSendStands="cancel"
    ></stand-list>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="50"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
import axios from "@/axios";
import StandList from "@/components/SendStands/StandList.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { StandList },
  data() {
    return {
      overlay: false,
      stands: [],
      search: "",
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
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
  created() {
    if (localStorage.getItem("user")) {
      this.loginUser(JSON.parse(localStorage.getItem("user")));
    } else if (!this.user.email) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["loginUser"]),
    async getStandsReadyToGo() {
      this.overlay = true;
      const res = await axios.get("/api/standsReadyToGo");
      this.stands = res.data;
      this.overlay = false;
    },
    cancel() {
      this.stands = [];
      this.search = "";
      this.$router.go(-1);
    },
  },
};
</script>
