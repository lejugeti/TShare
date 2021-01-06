import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import Connexion from '../views/Connexion.vue'
import CreateProfil from '../views/CreateProfil.vue'
import AffVetement from '../views/AffichageVetement'
import RechercheVetement from '../views/RechercheVetement'
import AjoutVetement from '../views/AjouterVetement'
import HistoriqueView from '../views/HistoriqueView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recherche vêtement',
    component: RechercheVetement
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/login',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/register',
    name: 'Nouveau profil',
    component: CreateProfil
  },
  {
    path: '/affVetement/:id',
    name: 'Affichage d\'un habit',
    component: AffVetement
  },
  {
    path: '/ajoutVetement',
    name: 'Ajout d\'un habit',
    component: AjoutVetement
  },
  {
    path: '/rechercheVetement',
    name: 'Recherche d\'un habit',
    component: RechercheVetement
  },
  {
    path: '/historique',
    component: HistoriqueView
  },
  {
    path: '/blanck',
    component: Home
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
