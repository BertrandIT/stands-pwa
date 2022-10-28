import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  created() {
    if (localStorage.getItem("user")) {
      this.loginUser(JSON.parse(localStorage.getItem("user")));
    } else if (!this.user.username) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["loginUser"]),
  },
};
