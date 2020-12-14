<template>
  <div class="main">
    <div class="description">
      <div class="content-text">
        <p style="font-weight: bold">{{ title }}</p>
        <p>{{ content }}</p>
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
          v-model="dateFromPicker"
          size="sm"
          v-if="title === 'Date de naissance'"
        ></b-form-datepicker>

        <b-form-group
          v-else-if="title === 'Sexe'"
          ><b-form-radio-group
            v-model="sexePicker"
            :options="['Masculin', 'Féminin', 'Non défini']"
          ></b-form-radio-group>
        </b-form-group>

        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          :placeholder="'Nouveau numéro'"
          size="sm"
          type="tel"
          v-else-if="title === 'Téléphone'"
        ></b-form-input>

        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          :placeholder="'Nouveau ' + title.toLowerCase()"
          size="sm"
          v-else
        ></b-form-input>

        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Mot de passe"
          size="sm"
          type="password"
          v-if="title === 'Mail'"
        ></b-form-input>

        <b-button class="margin-right" size="sm" type="reset" variant="secondary" @click="showModidifyForm = false">Annuler</b-button>
        <b-button size="sm" type="submit" variant="primary">Enregistrer</b-button>
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
      dateFromPicker: '',
      sexePicker: ''
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
  justify-content: end;
  margin: 0 0 10px 0;
}
.line {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: gray;
  height: 0.05rem;
}
</style>
