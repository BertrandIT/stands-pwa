import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/admitStands",
    name: "admitStands",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdmitStands.vue"),
  },
  {
    path: "/loadStands",
    name: "loadStands",
    component: () => import("../views/LoadStands.vue"),
  },
  {
    path: "/sendStands",
    name: "sendStands",
    component: () => import("../views/SendStands.vue"),
  },
  {
    path: "/returnStands",
    name: "returnStands",
    component: () => import("../views/ReturnStands.vue"),
  },
  {
    path: "/viewHistory",
    name: "viewHistory",
    component: () => import("../views/HistoryView.vue"),
  },
  {
    path: "/viewHistory/:standId/:standBarcode",
    name: "standDetails",
    component: () => import("../views/StandDetails.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
