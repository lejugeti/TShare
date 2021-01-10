<template>
  <div id="body">
    <!--Barre selection categorie-->
    <div id="categorie" class="my-accordion" role="tablist">
      <!--Boutons barre-->
      <b-button class="styleButton" v-b-toggle="'accordion-' + index" variant="light" role="tab"
        v-for="(item, index) in getTypesParent()" :key="index + 'P'">{{item.label}}</b-button>

      <!--Liste deroulee lors d'un clic sur un bouton de la barre-->
      <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel"
        v-for="(item, index) in getTypesParent()" :key="index + 'A'">
        <ul>
          <li class="listeCategorie"><a href="#" v-on:click="selectionBarreCategorie(item.idType)">Voir tout</a></li>
          <!--1ere generation types enfants du bouton-->
          <li class="listeCategorie" v-for="type in getTypesEnfant(item.idType)" :key="type.idType">
            <a href="#" v-on:click="selectionBarreCategorie(type.idType)">{{type.label}}</a>
          <ul>
            <!--2eme generation types enfants du bouton-->
            <li v-for="type2 in getTypesEnfant(type.idType)" :key="type2.idType">
              <a href="#" v-on:click="selectionBarreCategorie(type2.idType)">{{type2.label}}</a>
            </li>
          </ul>
          </li>
        </ul>
      </b-collapse>
    </div>

    <!--Barre filtres-->
    <div id="sidebar">
      <!--Categorie-->
      <div id="sideTitle" v-b-toggle.coll-categorie>Categorie</div>
      <b-collapse id="coll-categorie">
        <ul>
          <!--Type parent-->
          <li v-for="(item, index) in getTypesParent()" :key="index">
              <input type="checkbox" v-model="categorieCoche" :value="item.idType">
              {{item.label}}
            <ul>
              <!--1ere generation types enfants-->
              <li v-for="type in getTypesEnfant(item.idType)" :key="type.idType">
                <input type="checkbox" v-model="categorieCoche" :value="type.idType">
                {{type.label}}
                <ul>
                  <!--2eme generation types enfants-->
                  <li v-for="type2 in getTypesEnfant(type.idType)" :key="type2.idType">
                    <input type="checkbox" v-model="categorieCoche" :value="type2.idType">
                    {{type2.label}}
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </b-collapse>

      <!--Filtre-->
      <div id="sideTitle" v-b-toggle.coll-filtre>Filtre</div>

      <b-collapse id="coll-filtre">
        <!--Filtre date debut location-->
        <div id="debLocation" v-b-toggle.coll-debLoc>Debut location</div>
        <b-collapse id="coll-debLoc">
          <b-form-datepicker v-model="filtreDateDeb" size="sm"></b-form-datepicker>
          <b-button class="styleButton" id="datePickerBtn" v-on:click="enleverDateDebut" size="sm" variant="light">Enlever filtre</b-button>
        </b-collapse>

        <!--Filtre date fin location-->
        <div id="finLocation" v-b-toggle.coll-finLoc>Fin location</div>
        <b-collapse id="coll-finLoc">
          <b-form-datepicker v-model="filtreDateFin" size="sm"></b-form-datepicker>
          <b-button class="styleButton" id="datePickerBtn" v-on:click="enleverDateFin" size="sm" variant="light">Enlever filtre</b-button>
        </b-collapse>

        <!--Filtre type auquel s'adresse le vetement-->
        <div id="type" v-b-toggle.coll-type>Type</div>
        <b-collapse id="coll-type">
          <b-form-checkbox-group id="checkbox-group-filtre" v-model="selectedFiltre" :options="optionsFiltre">
          </b-form-checkbox-group>
        </b-collapse>

        <!--Filtre marque vetement-->
        <div id="marque" v-b-toggle.coll-marque>Marque</div>
        <b-collapse id="coll-marque">
          <b-form-checkbox-group id="checkbox-group-marque" v-model="selectedMarques" :options="marques">
          </b-form-checkbox-group>
        </b-collapse>

        <!--Filtre taille vetement-->
        <div id="taille" v-b-toggle.coll-taille>Taille</div>
        <b-collapse id="coll-taille">
          <b-form-checkbox-group id="checkbox-group-taille" v-model="selectedTailles" :options="tailles">
          </b-form-checkbox-group>
        </b-collapse>

        <!--Filtre couleur vetement-->
        <div id="couleur" v-b-toggle.coll-couleur>Couleur</div>
        <b-collapse id="coll-couleur">
          <b-form-checkbox-group id="checkbox-group-couleur" v-model="selectedCouleurs" :options="couleurs">
          </b-form-checkbox-group>
        </b-collapse>
      </b-collapse>

      <!--Tri-->
      <div id="sideTitle" v-b-toggle.coll-tri>Tri</div>
      <b-collapse id="coll-tri">
        <b-form-checkbox id="prixCroi" v-model="tri" value="croissant" unchecked-value="">
          Prix croissant
        </b-form-checkbox>
        <b-form-checkbox id="prixDecroi" v-model="tri" value="decroissant" unchecked-value="">
          Prix decroissant
        </b-form-checkbox>
      </b-collapse>
    </div>

    <!--Affichage vetements-->
    <div id="vetements">
      <b-row>
        <!--Carte d'un vetement-->
        <b-card-group class="col-md-3" v-for="vetement in ajoutFiltre" :key="vetement.idVetement">
          <!--Prix et image-->
          <b-card :title="vetement.prix + ' €'" :img-src="getImage(vetement)" img-top>

            <!--Informations et proprietaire-->
            <b-card-text>
              <p>{{vetement.titre}} <span v-if="vetement.marque != null">- {{vetement.marque}} </span>- {{vetement.taille}}</p>
              <p v-if="getProprietaire(vetement.idProprietaire) != null">{{getProprietaire(vetement.idProprietaire).prenom}}                {{getProprietaire(vetement.idProprietaire).nom}}</p>
            </b-card-text>

            <!--Bouton relie a la page de l'article-->
            <template #footer>
              <b-button class="styleButton" :href="'/affVetement/' + vetement.idVetement" variant="light">Voir l'article</b-button>
            </template>
          </b-card>
        </b-card-group>
      </b-row>

    </div>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'rechercheVetement',
  data () {
    return {
      // liste des vêtements
      posts: [],
      // liste des utilisateurs
      user: [],
      // liste des types de vêtements
      types: [],
      // liste des marques de vêtements
      marques: [],
      // liste des tailles de vêtements
      tailles: [],
      // liste des couleurs de vêtements
      couleurs: [],
      // options possible pour le type auquel le vêtement est adresse
      optionsFiltre: [
        { text: 'Féminin', value: 'f' },
        { text: 'Masculin', value: 'm' },
        { text: 'Unisexe', value: 'u' }
      ],

      // variables contenant les options selectionnees
      selectedFiltre: [],
      selectedMarques: [],
      selectedTailles: [],
      selectedCouleurs: [],
      categorieCoche: [],
      tri: '',
      filtreDateDeb: '',
      filtreDateFin: ''
    }
  },

  computed: {
    // mise a jour de la liste de vêtements en fonction des filtres cochés
    ajoutFiltre () {
      var resultats = this.posts
      var tabTemp = []
      // Filtre date debut location
      if (this.filtreDateDeb !== '') {
        resultats = resultats.filter(post => post.dateDebutDispo.split('T')[0] <= this.filtreDateDeb)
      }
      // Filtre date fin location
      if (this.filtreDateFin !== '') {
        resultats = resultats.filter(post => this.filtrerDateFin(post))
      }
      // Filtre type auquel s'adresse le vetement
      if (this.selectedFiltre.length !== 0) {
        this.selectedFiltre.forEach(type => {
          if (type === 'f') {
            Array.prototype.push.apply(tabTemp, resultats.filter(res => res.genre === 'feminin'))
          } else if (type === 'm') {
            Array.prototype.push.apply(tabTemp, resultats.filter(res => res.genre === 'masculin'))
          } else if (type === 'u') {
            Array.prototype.push.apply(tabTemp, resultats.filter(res => res.genre === 'unisexe'))
          }
        })
        resultats = tabTemp
      }
      // Filtre marque vetement
      if (this.selectedMarques.length !== 0) {
        tabTemp = []
        this.selectedMarques.forEach(marque => {
          Array.prototype.push.apply(tabTemp, resultats.filter(res => res.marque === marque))
        })
        resultats = tabTemp
      }
      // Filtre taille vetement
      if (this.selectedTailles.length !== 0) {
        tabTemp = []
        this.selectedTailles.forEach(taille => {
          Array.prototype.push.apply(tabTemp, resultats.filter(res => res.taille === taille))
        })
        resultats = tabTemp
      }
      // Filtre couleur vetement
      if (this.selectedCouleurs.length !== 0) {
        tabTemp = []
        this.selectedCouleurs.forEach(couleur => {
          Array.prototype.push.apply(tabTemp, resultats.filter(res => res.couleur === couleur))
        })
        resultats = tabTemp
      }
      // Tri du prix
      if (this.tri !== '') {
        if (this.tri === 'decroissant') {
          resultats.sort(function (a, b) { return b.prix - a.prix })
        } else {
          resultats.sort(function (a, b) { return a.prix - b.prix })
        }
      }
      // Filtre type de vetement
      if (this.categorieCoche.length !== 0) {
        var tab = []
        // recuperation des types selectionnes et de tous leurs enfants
        this.categorieCoche.forEach(categorie => {
          Array.prototype.push.apply(tab, this.getAllTypesEnfant(categorie))
          tab.push(categorie)
        })
        // retire les doublons
        tab = tab.filter((item, index) => tab.indexOf(item) === index)
        // recuperation de l'identifiant du type
        tab.forEach((e, index) => {
          if (e.idType !== undefined) {
            tab[index] = e.idType
          }
        })
        resultats = resultats.filter(res => tab.indexOf(res.idType) !== -1)
      }
      return resultats
    }
  },

  methods: {
    // recuperation dans un tableau des liens des photos d'un vetement, si il n'y en a pas le lien sera celui du logo du site
    getImage (vetement) {
      var lien = require('../assets/logo.png')
      if (vetement.photo !== null) {
        lien = require('../assets/vetements/' + vetement.photo)
      }
      return lien
    },

    // recuperation de tous les utilisateurs
    getUtilisateurs () {
      axios
        .get('http://localhost:3000/utilisateur')
        .then(response => {
          this.user = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    // recuperation des informations du proprietaire en fonction de son identifiant, retourne null si il n'existe pas
    getProprietaire (id) {
      var trouve = false
      var i = 0
      var infos
      while (!trouve && i < this.user.length) {
        if (this.user[i].idUtilisateur === id) {
          infos = this.user[i]
          trouve = true
        }
        i++
      }
      return infos
    },

    // recuperation de tous les types de vetements
    getTypes () {
      axios
        .get('http://localhost:3000/type')
        .then(response => {
          this.types = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    // recuperation des types racine (qui n'ont pas de parents)
    getTypesParent () {
      var parents = []
      this.types.forEach(type => {
        if (type.idTypeParent === null) {
          parents.push(type)
        }
      })
      return parents
    },

    // recuperation des enfants direct d'un parent a partir de son identifiant, si il n'en a pas, un tableau vide est retourné
    getTypesEnfant (idParent) {
      var enfants = []
      this.types.forEach(type => {
        if (type.idTypeParent === idParent) {
          enfants.push(type)
        }
      })
      return enfants
    },

    // recuperation de tous les enfants d'un parent a partir de son identifiant, si il n'en a pas, un tableau vide est retourné
    getAllTypesEnfant (idParent) {
      var enfants = []
      // tableau contenant les identifiants des types dont on a pas encore cherché les enfants
      var typeATraiter = []
      typeATraiter.push(idParent)
      while (typeATraiter.length !== 0) {
        var tmpEnfants = []
        Array.prototype.push.apply(tmpEnfants, this.getTypesEnfant(typeATraiter.shift()))
        Array.prototype.push.apply(enfants, tmpEnfants)
        tmpEnfants.forEach(enfant => { typeATraiter.push(enfant.idType) })
      }
      return enfants
    },

    // recuperation de toutes les marques de vetements
    getMarques () {
      axios
        .get('http://localhost:3000/vetement/marques')
        .then(response => {
          response.data.forEach(data => {
            this.marques.push(data.marque)
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    // recuperation de toutes les tailles de vetements
    getTailles () {
      axios
        .get('http://localhost:3000/vetement/tailles')
        .then(response => {
          response.data.forEach(data => {
            this.tailles.push(data.taille)
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    // recuperation de toutes les couleurs de vetements
    getCouleurs () {
      axios
        .get('http://localhost:3000/vetement/couleurs')
        .then(response => {
          response.data.forEach(data => {
            this.couleurs.push(data.couleur)
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    // retourne si un vetement est accessible jusqu'a la date selectionnee ou non
    filtrerDateFin (post) {
      var estInclus = true
      if (post.dateFinDispo !== null) {
        estInclus = (post.dateFinDispo.split('T')[0] >= this.filtreDateFin)
      }
      return estInclus
    },

    // reinitialise le filtre de date de debut
    enleverDateDebut () {
      this.filtreDateDeb = ''
    },

    // reinitialise le filtre de date de fin
    enleverDateFin () {
      this.filtreDateFin = ''
    },

    // filtrage des vetement en fonction du type selectionne dans la barre des categories et remise a 0 des autres filtres
    selectionBarreCategorie (type) {
      this.categorieCoche = []
      this.selectedFiltre = []
      this.selectedMarques = []
      this.selectedTailles = []
      this.selectedCouleurs = []
      this.enleverDateDebut()
      this.enleverDateFin()
      this.tri = ''
      this.categorieCoche.push(type)
    }
  },

  mounted: function () {
    // recuperation des vetements
    axios
      .get('http://localhost:3000/vetements')
      .then(response => {
        this.posts = response.data
        this.getUtilisateurs()
        this.getTypes()
        this.getMarques()
        this.getTailles()
        this.getCouleurs()
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style scoped>
@import "./../style/rechercheVetement.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
