<template>
  <div id="body">
    <!-- Caroussel d'images -->
    <div id="photos">
      <b-carousel id="carousel" :interval="0" controls indicators>
        <b-carousel-slide v-for="value in images" :key="value">
          <template #img>
            <img id="imgCarousel" :src="require('../assets/' + value)" />
          </template>
        </b-carousel-slide>
      </b-carousel>
      <a id="signaler" href="">Signaler cette annonce</a>
    </div>

    <!-- Caractéristiques du vêtement -->
    <div id="texte">
      <h2>{{ posts.titre }}</h2>
      <div id="infos">
        <p>Prix : {{ posts.prix }}€</p>
        <p>Localisation : {{ posts.localisation }}</p>

        <div id="calendrier">
          <b-button :pressed.sync="calEstCache" variant="light"
            >Afficher le calendrier</b-button
          >
          <b-calendar
            :readonly="true"
            :hide-header="true"
            :hidden="calEstCache"
            :date-info-fn="dateClass"
          ></b-calendar>
        </div>

        <p v-if="posts.marque != null">Marque : {{ posts.marque }}</p>
        <p>Taille : {{ posts.taille }}</p>
        <p>Couleur : {{ posts.couleur }}</p>
        <p>Etat : {{ posts.etat }}</p>
        <p>Genre : {{ posts.genre }}</p>
        <p>Condition de retour : {{ posts.conditionRetour }}</p>
        <p>Caution : {{ posts.caution }}€</p>

        <p v-if="posts.description != null">
          Description : <br />
          {{ posts.description }}
        </p>
        <p>Propriétaire : {{ proprietaire.prenom }} {{ proprietaire.nom }}</p>
        <p>Note : {{ moyenneNotes() }}/10</p>

        <b-button id="btnContact" variant="light" v-b-modal.contact>
          Contacter {{ proprietaire.prenom }} {{ proprietaire.nom }}
        </b-button>

        <!-- Pop up bouton contacter -->
        <b-modal
          id="contact"
          :title="proprietaire.prenom + ' ' + proprietaire.nom"
          hide-footer
          centered
        >
          <p v-if="proprietaire.telephone != null">
            Téléphone : {{ proprietaire.telephone }}
          </p>
          <p>Mail : {{ proprietaire.email }}</p>
        </b-modal>
      </div>
    </div>

    <!-- Commentaires -->
    <div id="commentaires">
      <p>Commentaires sur le propriétaire :</p>
      <div id="avis" v-for="value in listeNotesContientCom" :key="value">
        {{ value.commentaire }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

export default {
  name: "affichageVetement",

  data() {
    return {
      posts: [],
      proprietaire: [],
      notes: [],
      images: [],
      calEstCache: true
    };
  },

  computed: {
    listeNotesContientCom: function() {
      return this.notes.filter(i => i.commentaire != null);
    }
  },

  methods: {
    dateClass(ymd, date) {
      var estDispo;
      if (this.posts.dateFinDispo == null) {
        estDispo = date >= new Date(this.posts.dateDebutDispo);
      } else {
        estDispo =
          date >= new Date(this.posts.dateDebutDispo) &&
          date <= new Date(this.posts.dateFinDispo);
      }
      return estDispo ? "table-info" : "";
    },

    moyenneNotes() {
      var moy = 0;
      for (var value of this.notes) {
        moy += value.note;
      }
      return moy / this.notes.length;
    },

    getUtilisateur() {
      axios
        .get("http://localhost:3000/utilisateur/" + this.posts.idProprietaire)
        .then(response => {
          this.proprietaire = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    getNotes() {
      axios
        .get("http://localhost:3000/noteUser/" + this.posts.idProprietaire)
        .then(response => {
          this.notes = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },

  mounted() {
    axios
      .get("http://localhost:3000/vetement/" + this.$route.params.id)
      .then(response => {
        this.posts = response.data;
        this.getUtilisateur();
        this.getNotes();
        this.images = this.posts.photo.split(";");
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>

<style scoped>
@import "./../assets/affichageVetement.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
