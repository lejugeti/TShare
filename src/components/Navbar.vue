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
          <div class="nav-btn-container" >
            <router-link v-if="estConnected" class="button-link" :to="'/ajoutVetement'">
              <nav-button content="Ajouter un vêtement" />
            </router-link>
            <router-link v-if="!estConnected" class="button-link" :to="`/register`">
              <nav-button content="Créer un profil"/>
            </router-link>
            <router-link v-if="!estConnected" class="button-link" :to="`/login`">
              <nav-button content="Connexion"/>
            </router-link>
          </div>
          <div class="nav-btn-container" v-if="estConnected">
            <b-nav-item-dropdown :text="'Bonjour, ' + prenomUtilisateur + ' ' + nomUtilisateur " right class="nav-profil">
              <b-dropdown-item >
                <span class="nav-item-profil" @click="onLogOut">Déconnexion</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link class="nav-item-profil" :to="`/profil`">Profil</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
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
    }
  },
  computed: {
    estConnected () {
      return this.$store.state.idUtilisateur !== 0
    },
    nomUtilisateur () {
      return this.$store.state.nomUtilisateur
    },
    prenomUtilisateur () {
      return this.$store.state.prenomUtilisateur
    }
  },
  methods: {
    onLogOut () {
      this.$store.commit('disconnected')
      if (this.$router.currentRoute.path !== '/') {
        this.$router.push('/')
      }
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
    border-radius: 10px;
    margin-left: 16px;
    border-color: #B8D6AA;
  }
  .nav-item-profil{
    color: #555;
  }
  .nav-item-profil:active {
    color: white;
  }
</style>
