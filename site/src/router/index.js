import Vue from "vue";
import Router from "vue-router";
import AffVetement from "@/components/AffichageVetement";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
    },
    {
      path: "/affVetement/:id",
      component: AffVetement,
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
