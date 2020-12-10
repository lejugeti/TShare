<template>
  <div>
    <greenline title="Connexion"/>
    <div class="form-container">
      <b-form @submit="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Adresse mail:"
          label-for="input-1"
          label-cols-lg="3">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Entrer mail"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Mot de passe:"
          label-for="input-2"
          label-cols-lg="3">
          <b-form-input
            id="input-2"
            v-model="form.motdepasse"
            type="password"
            required
            placeholder="Mot de passe"
          ></b-form-input>
          <b-form-text id="input-live-help" class="red-text" v-if="isInvalid" >Champ(s) invalide(s). Mot de passe et/ou email incorrect</b-form-text>
        </b-form-group>

        <div class="submit-group">
          <b-button type="submit" variant="primary">Se connecter</b-button>
        </div>
        <router-link :to="`/`">Mot de passe oublié?</router-link>
      </b-form>
    </div>
  </div>

</template>

<script>
import greenline from '@/components/GreenLine.vue'

export default {
  components: {
    greenline
  },
  data () {
    return {
      form: {
        email: '',
        motdepasse: ''
      },
      show: true,
      isInvalid: false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      fetch('http://localhost:3000/utilisateur/mailMdpValide?email=' + this.form.email + '&motdepasse=' + this.form.motdepasse, {
        method: 'GET'
      }).then(response => response.json())
        .then(json => {
          console.log(json)
          if (typeof json.idUtilisateur !== 'undefined') {
            const infoConnection = {
              idUt: json.idUtilisateur.toString(),
              nom: json.prenom + ' ' + json.nom
            }
            this.$store.commit('connected', infoConnection)
            this.$router.go(-1)
          } else if (json.message === 'Invalid information') {
            this.isInvalid = true
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.form-container{
  width: 60%;
  margin: auto;
  padding-top: 30px;
  text-align: left;
}
.submit-group{
  width: 100%;
  text-align: right;
}
.red-text{
  color: red !important;
}
</style>
