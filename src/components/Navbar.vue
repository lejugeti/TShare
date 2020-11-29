<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand>
        <router-link :to="`/`">
          <img class="logo" src="../assets/logo_tshare.png"/>
        </router-link>
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!--Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Recherche"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Rechercher</b-button>
          </b-nav-form>
          <div class="nav-btn-container" v-if="idUtilisateur === 0">
            <router-link class="button-link" :to="`/register`">
              <nav-button content="Créer un profil"/>
            </router-link>
            <router-link class="button-link" :to="`/login`">
              <nav-button content="Connexion"/>
            </router-link>
          </div>
          <div class="nav-btn-container" v-else>
            <div class="nav-profil">
              <span>Bonjour, {{ nomUtilisateur }}</span>
            </div>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import NavButton from './NavButton.vue'

export default {
  components: { NavButton },
  data () {
    return {
      connected: '0'
    }
  },
  computed: {
    idUtilisateur () {
      return this.$store.state.idUtilisateur
    },
    nomUtilisateur () {
      return this.$store.state.nomUtilisateur
    }
  }
}
</script>

<style scoped>
  .logo{
    height: 60px;
    max-width: 100%;
  }
  .button-link{
    color: #555;
    text-decoration: none;
  }
  .nav-btn-container{
    display: flex;
  }
  .nav-profil {
    border: 1px solid #555;
    border-radius: 5px;
    padding: 5px;
    margin-left: 16px;
  }
</style>
