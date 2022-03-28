export default {
  methods: {
    calcDeadline(deadline) {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(deadline);
      const secondDate = new Date();
      if (deadline === undefined) {
        return null;
      } else if (deadline === null) {
        return "Stojak własny";
      }
      return Math.round((firstDate - secondDate) / oneDay);
    },
  },
};
