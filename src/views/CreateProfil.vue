<template>
  <div>
    <greenline title="Créer mon compte"/>
    <div class="form-container">
      <b-form>

        <!-- PRENOM -->
        <b-form-group
          label="Prénom:"
          label-cols-lg="3"
          label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="nouveauProfil.prenom"
            required
            placeholder="Entrer votre prénom"
          ></b-form-input>
        </b-form-group>

        <!-- NOM -->
        <b-form-group
          label="Nom:"
          label-for="input-1"
          label-cols-lg="3">
          <b-form-input
            id="input-1"
            v-model="nouveauProfil.nom"
            required
            placeholder="Entrer votre nom"
          ></b-form-input>
        </b-form-group>

        <!-- GENRE -->
        <b-form-group
          label="Genre:"
          label-cols-lg="3">
          <b-form-radio-group v-model="nouveauProfil.genre" required >
            <b-form-radio value="Féminin">Féminin</b-form-radio>
            <b-form-radio value="Masculin">Masculin</b-form-radio>
            <b-form-radio value="Non défini">Non défini</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <!-- DATE DE NAISSANCE -->
        <b-form-group
          label="Date de naissance:"
          label-for="input-3"
          label-cols-lg="3">
          <b-form-input
            id="input-3"
            v-model="nouveauProfil.dateDeNaissance"
            type="date"
            required
            placeholder="Entrer votre date de naissance"
          ></b-form-input>
        </b-form-group>

        <!-- ADRESSE -->
        <b-form-group
          label="Adresse:"
          label-cols-lg="3"
          label-for="input-4">
          <b-form-input
            id="input-4"
            class="form-line"
            v-model="ligneAdresse1"
            @change="onTextAdressChanged"
            required
            placeholder="Ligne 1">
          </b-form-input>
          <b-form-input
            class="form-line"
            v-model="ligneAdresse2"
            @change="onTextAdressChanged"
            placeholder="Ligne 2">
          </b-form-input>
          <div class="form-adress-group form-line">
          <b-form-input
            v-model="codePostal"
            @change="onTextAdressChanged"
            required
            placeholder="Code postal">
          </b-form-input>
          <b-form-input
            v-model="ville"
            @change="onTextAdressChanged"
            required
            placeholder="Ville">
          </b-form-input>
          </div>
        </b-form-group>

        <!-- TELEPHONE -->
        <b-form-group
          label="Téléphone:"
          label-cols-lg="3"
          label-for="input-7">
          <b-form-input
            id="input-7"
            v-model="nouveauProfil.telephone"
            type="tel"
            required
            placeholder="Entrer votre téléphone"
          ></b-form-input>
        </b-form-group>

        <!-- EMAIL -->
        <b-form-group
          label="Adresse mail:"
          label-for="input-5"
          label-cols-lg="3">
          <b-form-input
            id="input-5"
            v-model="nouveauProfil.email"
            type="email"
            required
            placeholder="Entrer mail"
            :state="emailState"
            @change="actualizeMailFeedback()"
            aria-describedby="input-live-help input-live-feedback1"
          ></b-form-input>
          <b-form-input
            class="form-line"
            v-model="email2"
            type="email"
            required
            placeholder="Confirmer votre mail"
            :state="emailState"
            @change="actualizeMailFeedback()"
            aria-describedby="input-live-help input-live-feedback1"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback1">
            {{ mailDescription }}
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- MOT DE PASSE -->
        <b-form-group
          label="Mot de passe:"
          label-for="input-6"
          label-cols-lg="3">
          <b-form-input
            id="input-6"
            v-model="nouveauProfil.motdepasse"
            type="password"
            required
            placeholder="Mot de passe"
          ></b-form-input>
          <b-form-input
            class="form-line"
            v-model="motdepasse2"
            type="password"
            required
            placeholder="Confirmer mot de passe"
            :state="mdpState"
            aria-describedby="input-live-help input-live-feedback2"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback2">
            Mots de passe différents
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- CGU -->
        <b-form-checkbox
          name="checkbox-CGU"
          value="accepted"
          unchecked-value="not_accepted"
          required>
          En cochant cette case, vous accepter nos conditions générals d’utilisations et notre politique de confidentialité
        </b-form-checkbox>

        <!-- VALIDATION -->
        <div class="submit-group">
          <buttonPerso variant="fill" content="Valide" @click.native="onSubmit" />
        </div>

      </b-form>
    </div>
  </div>
</template>

<script>
import greenline from '@/components/GreenLine.vue'
import buttonPerso from '@/components/ButtonPerso.vue'

export default {
  components: {
    greenline,
    buttonPerso
  },
  data () {
    return {
      nouveauProfil: {
        genre: '',
        nom: '',
        prenom: '',
        dateDeNaissance: '',
        adresse: '',
        email: '',
        telephone: '',
        motdepasse: ''
      },
      mailDescription: 'Adresses mail différentes',
      mailAvailable: true,
      email2: '',
      motdepasse2: '',
      ligneAdresse1: '',
      ligneAdresse2: '',
      codePostal: '',
      ville: ''
    }
  },
  methods: {
    onSubmit () {
      var jsonData = JSON.stringify(this.nouveauProfil)
      fetch('http://localhost:3000/utilisateur/', {
        method: 'POST',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Content-Length': jsonData.length
        }
      }).then(response => response.json())
        .then(json => {
          if (typeof json.idUtilisateur !== 'undefined') {
            const infoConnection = {
              idUt: json.idUtilisateur.toString(),
              nom: this.nouveauProfil.nom,
              prenom: this.nouveauProfil.prenom
            }
            this.$store.commit('connected', infoConnection)
            this.$router.go(-1)
          } else if (json.message === 'Email address already used') {
            this.mailAvailable = false
            this.emailState = false
          }
        })
        .catch(err => console.log(err))
    },
    onTextAdressChanged () {
      this.nouveauProfil.adresse = this.ligneAdresse1 + ', ' + (this.ligneAdresse2.length > 0 ? this.ligneAdresse2 + ', ' : '') + this.codePostal + ' ' + this.ville
    },
    actualizeMailFeedback () {
      this.mailDescription = 'Adresses mail différentes'
      this.mailAvailable = true
    }
  },
  computed: {
    mdpState () {
      if (this.nouveauProfil.motdepasse.length > 0) {
        if (this.nouveauProfil.motdepasse === this.motdepasse2) {
          return true
        } else {
          return false
        }
      }
      return undefined
    },
    emailState: {
      get: function () {
        if (this.nouveauProfil.email === this.email2 && this.nouveauProfil.email.length > 0 && this.mailAvailable) {
          return true
        } else if (this.nouveauProfil.email.length === 0) {
          return undefined
        } else {
          return false
        }
      },
      set: function (estValide) {
        if (!estValide) {
          if (!this.mailAvailable) {
            this.mailDescription = 'Adresse mail déjà utilisée'
          } else {
            this.mailDescription = 'Adresse mail différentes'
          }
        }
      }
    }
  },
  mounted: function () {
    if (this.$store.state.idUtilisateur !== 0) {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.form-container{
  width: 80%;
  max-width: 800px;
  margin: auto;
  text-align: left;
  padding-top: 30px;
  padding-bottom: 50px;
}
.submit-group{
  width: 100%;
  text-align: right;
}
.form-adress-group{
  display: flex;
}
.form-adress-group :nth-child(1){
  margin-right: 8px;
  flex-shrink: 2;
}
.form-line{
  margin-top: 4px;
}
</style>
