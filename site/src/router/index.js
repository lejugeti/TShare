import Vue from "vue";
import VueRouter from "vue-router";
import AffVetement from "@/components/AffichageVetement";
import RechercheVetement from "@/components/RechercheVetement";
import AjoutVetement from "@/components/AjouterVetement";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: RechercheVetement },
    { path: "/affVetement/:id", component: AffVetement },
    { path: "/ajoutVetement/", component: AjoutVetement },
    { path: "/rechercheVetement/", component: RechercheVetement },
    { path: "*", redirect: "/" }
  ]
});

export default router;