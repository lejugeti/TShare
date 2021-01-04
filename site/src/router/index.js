import Vue from "vue";
import Router from "vue-router";
import AffVetement from "@/components/AffichageVetement";
import RechercheVetement from "@/components/RechercheVetement";
import AjoutVetement from "@/components/AjouterVetement";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: RechercheVetement,
    },
    {
      path: "/affVetement/:id",
      component: AffVetement
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
