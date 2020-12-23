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
              <p><b-icon icon="star-fill"></b-icon> {{ noteMoy }} / 5 ({{ nbComment }} avis)</p>
            </div>
          </div>
          <div class="description-section">
            <h3>Description</h3>
            <div v-if="!isDescEdit">
              <p class="profil-description" >{{ desc }}</p>
              <b-button variant="outline-primary" size="sm" @click="isDescEdit = isDescEdit?false:true">Modifier</b-button>
            </div>
            <div v-else>
              <b-form-textarea max-rows="12" class="profil-description" v-model="description"></b-form-textarea>
              <div>
                <b-button class="margin-right" variant="secondary" size="sm" @click="onClickAnnuler" v-if="!saving">Annuler</b-button>
                <b-button variant="primary" size="sm" @click="onClickEnregistrer" v-if="!saving">Enregistrer</b-button>
                <b-icon icon="arrow-clockwise" animation="spin" font-scale="2" v-if="saving"></b-icon>
              </div>
            </div>
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
              <persoInfoLine title="Email" :content="email" />
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
      nbComment: 0,
      commentsReceive: [],
      commentsSent: [],
      nom: '',
      prenom: '',
      genre: '',
      dateDeNaissance: '',
      email: '',
      tel: '',
      adresse: '',
      description: '',
      desc: '',
      saving: false,
      isDescEdit: false,
      noteReçu: '',
      noteEnvoye: '',
      noteMoy: 3.5
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
        this.desc = json.description
        this.description = this.desc
        this.genre = json.genre
      })
      .catch(err => console.log(err))

    fetch('http://localhost:3000/note/sended/' + this.$store.state.idUtilisateur, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(json => {
        this.commentsSent = this.formatDate(json)
      })
      .catch(err => console.log(err))

    fetch('http://localhost:3000/note/received/' + this.$store.state.idUtilisateur, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(response => response.json())
      .then(json => {
        this.commentsReceive = this.formatDate(json)
        this.getNoteMoyenne(json)
      })
      .catch(err => console.log(err))
  },
  methods: {
    onClickEnregistrer () {
      var jsonData = '{"modif":"' + this.description + '"}'
      console.log(jsonData)
      fetch('http://localhost:3000/utilisateur/' + this.$store.state.idUtilisateur + '/description', {
        method: 'PUT',
        body: jsonData,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Content-Length': jsonData.length
        }
      }).then(response => response.json())
        .then(json => {
          if (json.idUtilisateur !== undefined) {
            this.saving = false
            this.desc = this.description
            this.isDescEdit = false
          }
        })
        .catch(err => console.log(err))
    },
    onClickAnnuler () {
      this.description = this.desc
      this.isDescEdit = false
    },
    formatDate (comments) {
      for (let i = 0; i < comments.length; i++) {
        const date = new Date(comments[i].Date)
        comments[i].Date = date.toLocaleDateString()
      }
      return comments
    },
    getNoteMoyenne (comments) {
      var len = comments.length
      var sum = 0
      for (let i = 0; i < len; i++) {
        sum += comments[i].Note
      }
      this.noteMoy = sum / len
      this.nbComment = len
    }
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
  width: 100%;
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
.profil-description{
  width: 100%;
  height: auto;
  text-align: justify;
  margin-bottom: 12px;
}
.fausse-image{
  height: 230px;
  width: 230px;
  background-color: silver;
}
.margin-right{
  margin-right: 6px;
}
</style>

<style>
:root {
  --margintop: 3vw;
  --marginleft: 5vw;
}
</style>
