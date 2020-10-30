<template>
  <b-navbar toggleable="lg" type="" variant="faded">
    <b-navbar-brand to="/">
<<<<<<< HEAD
      <img id="logo" src="./../assets/logo.png" @click="navToDefaultPage"/>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto text">
      <b-nav-item to="/navbar" class=" mr-4" @click="navToAjoutPage">Ajouter un vêtement</b-nav-item>
=======
      <img id="logo" src="./../assets/logo.png"/>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto text">
>>>>>>> 9364028 (Rebase main)
      <b-nav-item to="/navbar" class=" mr-4">Créer mon compte</b-nav-item>
      <b-nav-item to="/navbar" class=" mr-4">Se connecter</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
<<<<<<< HEAD
  name: "navbar",
  methods: {
    navToDefaultPage(){
      this.$router.push("/rechercheVetement")
    },
    navToAjoutPage(){
      this.$router.push("/ajoutVetement")
    }
  }
=======
  name: "navbar"
>>>>>>> 9364028 (Rebase main)
};
</script>

<style scoped>
@import "./../assets/navbar.css";
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
</style>
