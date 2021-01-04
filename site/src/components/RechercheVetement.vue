<template>
  <div id="body">
    <div id="categorie" class="my-accordion" role="tablist">
        <b-button class="styleButton" v-b-toggle="'accordion-' + index" variant="light" role="tab" 
        v-for="(item, index) in getTypesParent()" :key="index + 'P'">{{item.label}}</b-button>

        <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel" 
        v-for="(item, index) in getTypesParent()" :key="index + 'A'">
          <ul>
            <li id="listeCategorie" v-for="type in getTypesEnfant(item.idType)" :key="type.idType">
              {{type.label}}
            <ul>
              <li v-for="type2 in getTypesEnfant(type.idType)" :key="type2.idType">{{type2.label}}</li>
            </ul>
            </li>
          </ul>
        </b-collapse>
    </div>

    <div id="sidebar">
      <div id="sideTitle" v-b-toggle.coll-categorie>Categorie</div>
      <b-collapse id="coll-categorie">
        <ul>
          <li v-for="(item, index) in getTypesParent()" :key="index">
              <input type="checkbox" v-model="categorieCoche" :value="item.idType">
              {{item.label}}
            <ul>
              <li v-for="type in getTypesEnfant(item.idType)" :key="type.idType">
                <input type="checkbox" v-model="categorieCoche" :value="type.idType">
                {{type.label}}
                <ul>
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

      <div id="sideTitle" v-b-toggle.coll-filtre>Filtre</div>

      <b-collapse id="coll-filtre">
        <div id="debLocation" v-b-toggle.coll-debLoc>Debut location</div>
        <b-collapse id="coll-debLoc">
          <b-form-datepicker v-model="filtreDateDeb" size="sm"></b-form-datepicker>
          <b-button class="styleButton" id="datePickerBtn" v-on:click="enleverDateDebut" size="sm" variant="light">Enlever filtre</b-button>
        </b-collapse>

        <div id="finLocation" v-b-toggle.coll-finLoc>Fin location</div>
        <b-collapse id="coll-finLoc">
          <b-form-datepicker v-model="filtreDateFin" size="sm"></b-form-datepicker>
          <b-button class="styleButton" id="datePickerBtn" v-on:click="enleverDateFin" size="sm" variant="light">Enlever filtre</b-button>
        </b-collapse>

        <div id="type" v-b-toggle.coll-type>Type</div>
        <b-collapse id="coll-type">
          <b-form-checkbox-group id="checkbox-group-filtre" v-model="selectedFiltre" :options="optionsFiltre">
          </b-form-checkbox-group>
        </b-collapse>

        <div id="marque" v-b-toggle.coll-marque>Marque</div>
        <b-collapse id="coll-marque">
          <b-form-checkbox-group id="checkbox-group-marque" v-model="selectedMarques" :options="marques">
          </b-form-checkbox-group>
        </b-collapse>

        <div id="taille" v-b-toggle.coll-taille>Taille</div>
        <b-collapse id="coll-taille">
          <b-form-checkbox-group id="checkbox-group-taille" v-model="selectedTailles" :options="tailles">
          </b-form-checkbox-group>
        </b-collapse>

        <div id="couleur" v-b-toggle.coll-couleur>Couleur</div>
        <b-collapse id="coll-couleur">
          <b-form-checkbox-group id="checkbox-group-couleur" v-model="selectedCouleurs" :options="couleurs">
          </b-form-checkbox-group>
        </b-collapse>
      </b-collapse>

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

    <div id="vetements">
      <b-row>
        <b-card-group class="col-md-3" v-for="vetement in ajoutFiltre" :key="vetement.idVetement">
          <b-card :title="vetement.prix + ' €'" :img-src="getImage(vetement)" img-top>
            <b-card-text>
              <p>{{vetement.titre}} <span v-if="vetement.marque != null">- {{vetement.marque}} </span>- {{vetement.taille}}</p>
              <p v-if="getProprietaire(vetement.idProprietaire) != null">{{getProprietaire(vetement.idProprietaire).prenom}} 
                {{getProprietaire(vetement.idProprietaire).nom}}</p>
            </b-card-text>
            
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
import Vue from "vue";
import axios from "axios";

export default {
  name: "rechercheVetement",
  data() {
    return {
      posts: [],
      user: [],
      types: [],
      marques: [],
      tailles: [],
      couleurs: [],
      filtreDateDeb: "",
      filtreDateFin: "",
      selectedFiltre: [],
      optionsFiltre: [
        { text: "Féminin", value: "f" },
        { text: "Masculin", value: "m" },
        { text: "Unisexe", value: "u" }
      ],
      selectedMarques: [],
      selectedTailles: [],
      selectedCouleurs: [],
      tri: "",
      categorieCoche: [],
    };
  },

  computed: {
    ajoutFiltre(){
      console.log(this.categorieCoche);
      var resultats = this.posts;
      if(this.filtreDateDeb != ""){
        resultats = resultats.filter(post => post.dateDebutDispo.split('T')[0] <= this.filtreDateDeb);
      } 
      if(this.filtreDateFin != ""){
        resultats = resultats.filter(post => this.filtrerDateFin(post));
      }  
      if(this.selectedFiltre.length != 0){
        var tabTemp = [];
        this.selectedFiltre.forEach(type => {
          if(type == "f"){
            Array.prototype.push.apply(tabTemp, resultats.filter(res => res.genre == "feminin"));
          } else if(type == "m"){
            Array.prototype.push.apply(tabTemp, resultats.filter(res => res.genre == "masculin"));
          } else if(type == "u"){
            Array.prototype.push.apply(tabTemp, resultats.filter(res => res.genre == "unisexe"));
          }
        });
        resultats = tabTemp;
      }    
      if(this.selectedMarques.length != 0){
        var tabTemp = [];
        this.selectedMarques.forEach(marque => {
          Array.prototype.push.apply(tabTemp, resultats.filter(res => res.marque == marque));
        });
        resultats = tabTemp;
      }
      if(this.selectedTailles.length != 0){
        var tabTemp = [];
        this.selectedTailles.forEach(taille => {
          Array.prototype.push.apply(tabTemp, resultats.filter(res => res.taille == taille));
        });
        resultats = tabTemp;
      }
      if(this.selectedCouleurs.length != 0){
        var tabTemp = [];
        this.selectedCouleurs.forEach(couleur => {
          Array.prototype.push.apply(tabTemp, resultats.filter(res => res.couleur == couleur));
        });
        resultats = tabTemp;
      }
      if(this.tri != ""){
        if(this.tri == "decroissant"){
          resultats.sort(function(a, b){return b.prix - a.prix});
        } else {
          resultats.sort(function(a, b){return a.prix - b.prix});
        }
      }
      return resultats;
    }
  },

  methods: {
    getImage(vetement) {
      var lien = require('../assets/logo.png');
      if(vetement.photo != null){
        lien = require('../assets/' + vetement.photo.split(";")[0]);
      }
      return lien;
    },

    getUtilisateurs() {
      axios
        .get("http://localhost:3000/utilisateur")
        .then(response => {
          this.user = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    getProprietaire(id) {
      var trouve = false;
      var i = 0;
      var infos;
      while(!trouve && i<this.user.length){
        if(this.user[i].idUtilisateur == id){
          infos = this.user[i];
          trouve = true;
        }
        i++;
      }
      return infos;
    },

    getTypes() {
      axios
        .get("http://localhost:3000/type")
        .then(response => {
          this.types = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    getTypesParent() {
      var parents = [];
      this.types.forEach(type => {
        if(type.idTypeParent == null){
          parents.push(type);
        }
      });
      return parents;
    },

    getTypesEnfant(idParent) {
      var enfants = [];
      this.types.forEach(type => {
        if(type.idTypeParent == idParent){
          enfants.push(type);
        }
      });
      return enfants;
    },
    
    getMarques(){
      axios
        .get("http://localhost:3000/vetement/marques")
        .then(response => {
          response.data.forEach(data => { 
            this.marques.push(data.marque);
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    getTailles(){
      axios
        .get("http://localhost:3000/vetement/tailles")
        .then(response => {
          response.data.forEach(data => { 
            this.tailles.push(data.taille);
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    getCouleurs(){
      axios
        .get("http://localhost:3000/vetement/couleurs")
        .then(response => {
          response.data.forEach(data => { 
            this.couleurs.push(data.couleur);
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    filtrerDateFin(post) {
      var estInclus = true;
      if(post.dateFinDispo != null){
        estInclus = (post.dateFinDispo.split('T')[0] >= this.filtreDateFin);
      }
      return estInclus;
    },
    
    enleverDateDebut(){
      this.filtreDateDeb = "";
    },

    enleverDateFin(){
      this.filtreDateFin = "";
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/vetements")
      .then(response => {
        this.posts = response.data;
        this.affVetements = this.posts;
        this.getUtilisateurs();
        this.getTypes();
        this.getMarques();
        this.getTailles();
        this.getCouleurs();
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

<style scoped>
@import "./../assets/rechercheVetement.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
