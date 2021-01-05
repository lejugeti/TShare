<template>
  <div id="body">
    <!-- Caroussel d'images -->
    <div>
      <b-carousel id="carousel" :interval="0" controls indicators>
        <b-carousel-slide v-for="value in images" :key="value">
          <template #img>
            <img id="imgCarousel" :src="require('../assets/' + value)" />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </div>

    <!-- Caractéristiques du vêtement -->
    <div id="texte">
      <h2>{{ titre }}</h2>
      <div id="infos">

        <p>Localisation : {{ localisation }}</p>

        <div id="calendrier">
          <b-button :pressed.sync="calEstCache" variant="light">Afficher le calendrier</b-button>
          <b-calendar :readonly=true :hide-header=true :hidden=calEstCache :date-info-fn="dateClass"></b-calendar>
        </div>

        <p v-if="marque != null">Marque : {{ marque }}</p>
        <p>Taille : {{ taille }}</p>
        <p>Couleur : {{ couleur }}</p>
        <p v-if="description != null">Description : <br /> {{ description }}</p>
        <p>Propriétaire : {{ proprietaire }}</p>
        <p>Note : {{ note }}/10</p>

        <b-button id="btnContact" variant="light" v-b-modal.contact>
          Contacter {{ proprietaire }}
        </b-button>

        <!-- Pop up bouton contacter -->
        <b-modal id="contact" :title="proprietaire" hide-footer centered>
          <p v-if="telephone != null">Téléphone : {{ telephone }}</p>
          <p>Mail : {{ mail }}</p>
        </b-modal>
      </div>
    </div>

    <!-- Commentaires -->
    <div id="commentaires">
      <p>Commentaires sur le propriétaire :</p>
      <div id="avis" v-for="value in commentaires" :key="value">
        {{value}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'affichageVetement',
  data () {
    return {
      images: ['teeShirt.png', 'logo.png'],
      titre: 'Titre du produit',
      localisation: '33000 Bordeaux',
      marque: 'Petit Bateau',
      taille: 'XXL',
      couleur: 'Orange',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      proprietaire: 'Gros Bocal',
      note: '2',
      telephone: '01234567',
      mail: 'meilalacon@gepadide.nul',
      commentaires: ['Nul', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'],
      dateMin: new Date(2020, 10, 2),
      dateMax: new Date(2020, 10, 20),
      calEstCache: true
    }
  },
  methods: {
    dateClass (ymd, date) {
      console.log(this.dateMin)
      return date >= this.dateMin && date <= this.dateMax ? 'table-info' : ''
    }
  }
}
</script>

<style scoped>
@import "./../style/affichageVetement.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
