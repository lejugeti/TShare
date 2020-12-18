<template>
  <div class="main">
    <div class="description">
      <div class="content-text">
        <p style="font-weight: bold">{{ title }}</p>
        <p>{{ valeur }}</p>
      </div>
      <div>
        <b-button variant="outline-primary" size="sm" class="btn_modify" @click="showModidifyForm = true">Modifier</b-button>
      </div>
    </div>
    <div class="modif" v-if="showModidifyForm">
      <b-form class="form-adress" v-if="title === 'Adresse'">
        <b-form-input
          placeholder="Ligne 1"
          size="sm"
        ></b-form-input>
        <b-form-input
          placeholder="Ligne 2"
          size="sm"
        ></b-form-input>
        <div class="inline-input-form">
          <b-form-input
            placeholder="Code postale"
            size="sm"
            class="margin-right"
          ></b-form-input>
          <b-form-input
            placeholder="Ville"
            size="sm"
          ></b-form-input>
        </div>
        <div class="button-form-adress">
          <b-button class="margin-right" size="sm" type="reset" variant="secondary" @click="showModidifyForm = false">Annuler</b-button>
          <b-button size="sm" type="submit" variant="primary">Enregistrer</b-button>
        </div>
      </b-form>

      <b-form class="form-general" inline v-else>
        <b-form-datepicker
          class="margin-right"
          v-model="modification"
          size="sm"
          v-if="title === 'Date de naissance'"
        ></b-form-datepicker>

        <b-form-group
          v-else-if="title === 'Sexe'"
          ><b-form-radio-group
            v-model="modification"
            :options="['Masculin', 'Féminin', 'Non défini']"
          ></b-form-radio-group>
        </b-form-group>

        <b-form-input
          v-model="modification"
          class="mb-2 mr-sm-2 mb-sm-0"
          :placeholder="'Nouveau numéro'"
          size="sm"
          type="tel"
          v-else-if="title === 'Téléphone'"
        ></b-form-input>

        <b-form-input
          v-model="modification"
          class="mb-2 mr-sm-2 mb-sm-0"
          :placeholder="'Nouveau ' + title.toLowerCase()"
          size="sm"
          v-else
        ></b-form-input>

        <b-form-input
          v-model="modification"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Mot de passe"
          size="sm"
          type="password"
          v-if="title === 'Mail'"
        ></b-form-input>

        <b-button class="margin-right" size="sm" type="reset" variant="secondary" @click="showModidifyForm = false" v-if="!saving">Annuler</b-button>
        <b-button size="sm" variant="primary" @click="update()" v-if="!saving">Enregistrer</b-button>
        <b-icon icon="arrow-clockwise" animation="spin" font-scale="2" v-if="saving"></b-icon>
      </b-form>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String
  },
  data () {
    return {
      showModidifyForm: false,
      modification: '',
      valeur: this.content,
      saving: false
    }
  },
  methods: {
    getType () {
      var type = this.title.toLowerCase().replace('é', 'e').replace('é', 'e')
      if (type.indexOf(' ') === -1) {
        return type
      } else {
        while (type.indexOf(' ') !== -1) {
          var i = type.indexOf(' ')
          type = type.slice(0, i) + type.charAt(i + 1).toUpperCase() + type.slice(i + 2)
        }
        return type
      }
    },
    update () {
      if (this.modification.length !== 0) {
        this.saving = true
        var type = this.getType()
        var jsonData = '{"modif":"' + this.modification + '"}'
        fetch('http://localhost:3000/utilisateur/' + this.$store.state.idUtilisateur + '/' + type, {
          method: 'PUT',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': jsonData.length
          }
        }).then(response => response.json())
          .then(json => {
            if (json.idUtilisateur !== undefined) {
              this.showModidifyForm = false
              this.valeur = json.modif
              this.modification = ''
              this.saving = false
            }
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style scoped>
.main{
  max-width: 700px;
  width: 50vw;
  margin-right: 5vw;
  display: flex;
  flex-direction: column;
}
.description{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;
  align-items: center;
}
.main p{
  margin: 0;
  font-size: 1.1rem;
}
.content-text {
  text-align: left;
}
.margin-right{
  margin-right: 6px;
}
.form-general{
  margin: 10px 0 10px 0;
}
.form-adress{
  width: 60%;
  margin-top: 5px;
}
.form-adress *{
  margin-top: 10px;
}
.inline-input-form{
  display: flex;
  margin-top: 0;
}
.button-form-adress{
  display: flex;
  justify-content: flex-end;
  margin: 0 0 10px 0;
}
.line {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: gray;
  height: 0.05rem;
}
</style>
