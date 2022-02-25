import axios from "@/axios";

export default {
  methods: {
    async checkStand({ barcode, notAllowedStatuses }) {
      if (barcode) {
        const res = await axios.get(`/api/windowStandPwa/${barcode}`);
        if (res.data) {
          if (notAllowedStatuses.includes(res.data.action)) {
            this.$root.manageAlert({
              text: `Nie można zwrócić tego stojaka, ponieważ ma status ${res.data.action}`,
              type: "error",
            });
            return false;
          } else {
            this.$root.manageAlert({
              text: `Pomyślnie załadowano stojak`,
              type: "success",
              time: 1500,
            });
            return res.data;
          }
        } else {
          this.$root.manageAlert({
            text: "Nie znaleziono stojaka o podanym barkodzie",
            type: "error",
          });
          return false;
        }
      } else {
        this.$root.manageAlert({
          text: "Nie podano barkodu stojaka",
          type: "error",
        });
        return false;
      }
    },
  },
};
