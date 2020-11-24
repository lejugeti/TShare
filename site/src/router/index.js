import Vue from "vue";
import Router from "vue-router";
import AffVetement from "@/components/AffichageVetement";
import AjoutVetement from "@/components/AjouterVetement";

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
      path: "/ajoutVetement/",
      component: AjoutVetement,
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
