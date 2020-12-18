<template>
    <div class="maine">
      <greenline />
      <div class="main">
        <div class="cont-border selection-section">
          <buttonSection content="Détail du profil" :selected="this.selected === 1" v-on:click.native="selected = 1"/>
          <buttonSection content="Notes reçues" :selected="this.selected === 2" v-on:click.native="selected = 2"/>
          <buttonSection content="Notes données" :selected="this.selected === 3" v-on:click.native="selected = 3"/>
          <buttonSection content="Information personnelles" :selected="this.selected === 4" v-on:click.native="selected = 4"/>
          <buttonSection content="Notifications" :selected="this.selected === 5" v-on:click.native="selected = 5"/>
          <buttonSection content="Paramètres de confidentialités" :selected="this.selected === 6" v-on:click.native="selected = 6"/>
        </div>
        <div class="section" v-if="selected === 1" >
          <div class="cont-border detail-section">
            <div class="picture-section">
              <div class="fausse-image">
              </div>
              <b-button variant="outline-primary" size="sm">Changer photo de profil</b-button>
              <p><b-icon icon="star-fill"></b-icon> {{ nbView }} avis</p>
            </div>
          </div>
          <div class="description-section">
            <h3>Description</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore quaerat, soluta necessitatibus ratione corporis exercitationem quasi repellat incidunt sequi. Praesentium officia consequuntur excepturi consequatur neque doloremque deserunt enim repudiandae quis!</p>
            <b-button variant="outline-primary" size="sm">Modifier</b-button>
          </div>
        </div>
        <div class="section" v-if="selected === 2" >
          <b-table class="section-comment" striped hover :items="commentsReceive"></b-table>
        </div>
        <div class="section" v-if="selected === 3" >
          <b-table class="section-comment" striped hover :items="commentsSent"></b-table>
        </div>
        <div class="section" v-if="selected === 4" >
          <div class="perso-section">
            <div>
              <persoInfoLine title="Nom" :content="nom"/>
              <persoInfoLine title="Prenom" :content="prenom"/>
              <persoInfoLine title="Sexe" :content="genre"/>
              <persoInfoLine title="Date de naissance" :content="dateDeNaissance"/>
              <persoInfoLine title="Adresse" :content="adresse" />
              <persoInfoLine title="Téléphone" :content="tel" />
              <persoInfoLine title="Mail" :content="email" />
              <div class="modify-pwd-container">
                <b-button variant="outline-primary">Modifier mot de passe</b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="section" v-if="selected === 5" >
        </div>
        <div class="section" v-if="selected === 6" >
        </div>
      </div>
    </div>
</template>

<script>
import greenline from '@/components/GreenLine.vue'
import buttonSection from '@/components/ProfilSectionButton.vue'
import persoInfoLine from '@/components/PersoInfoLine.vue'

export default {
  name: 'profil',
  components: {
    greenline,
    buttonSection,
    persoInfoLine
  },
  data () {
    return {
      selected: 1,
      nbView: 5,
      commentsReceive: [
        { utilisateur: 'momo', note_reçue: 5, commentaire: 'Noice', date: '10/12/2020' }
      ],
      commentsSent: [
        { utilisateur: 'momo', note_donnée: 5, commentaire: 'Noice', date: '10/12/2020' }
      ],
      nom: '',
      prenom: '',
      genre: '',
      dateDeNaissance: '',
      email: '',
      tel: '',
      adresse: '',
      description: ''
    }
  },
  methods: {
    changeSelection (selection) {
      console.log(selection)
      this.selected = selection
    }
  },
  mounted: function () {
    fetch('http://localhost:3000/utilisateur/' + this.$store.state.idUtilisateur, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(json => {
        this.nom = json.nom
        this.prenom = json.prenom
        this.tel = json.telephone
        var date = new Date(json.dateDeNaissance)
        this.dateDeNaissance = date.toLocaleDateString()
        this.adresse = json.adresse
        this.email = json.email
        this.description = json.description
        this.genre = json.genre
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
.main{
  display: flex;
}
.section{
  width: calc(100vw - 15vh - 230px);
  position: relative;
  margin-left: var(--marginleft);
  margin-top: var(--margintop);
  display: flex;
}
.cont-border{
  border: solid 2px #B8D6AA;
  border-radius: 50px;
  height: 70vh;
  min-height: 350px;
}
.selection-section{
  position: sticky;
  width: 280px;
  top: var(--margintop);
  margin-left: var(--marginleft);
  margin-top: var(--margintop);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.detail-section{
  width: 35%;
  min-width: 330px;
  max-width: 450px;
}
.picture-section{
  max-height: 350px;
  width: 100%;
  height: 100%;
  margin-top: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.description-section{
  text-align: left;
  padding-left: 60px;
  padding-top: 30px;
  padding-right: 60px;
}
.section-comment{
  margin-right: 60px;
}
.perso-section{
  width: 100%;
  display: flex;
  justify-content: center;
}
.modify-pwd-container{
  width: 100%;
  display: flex;
  justify-content: left;
}
.fausse-image{
  height: 230px;
  width: 230px;
  background-color: silver;
}
</style>

<style>
:root {
  --margintop: 3vw;
  --marginleft: 5vw;
}
</style>
