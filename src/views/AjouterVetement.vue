<template>
    <body>
        <b-container id="titrePage" fluid>
            <b-row align-h="center">
                Mettre en location un article
            </b-row>
        </b-container>
        <b-form @submit="onSubmit">
            <b-container id="body" fluid>
                <b-row align-h="around">
                    <!-- COLONNE GAUCHE -->
                    <b-col id="colonneGauche" class="colonne-page" cols="3">
                        <b-row id="inputGroupTitre" class="input-row">
                            <b-col cols="3">
                                <label for="inputTitre">Titre : </label>
                            </b-col>
                            <b-col>
                                <b-form-input
                                id="inputTitre"
                                v-model="form.titre"
                                required
                                >
                                </b-form-input>
                            </b-col>
                        </b-row>
                        <b-form-group
                            id="group-form-description"
                            label="Description : "
                            label-for="input-description"
                        >
                            <b-form-input
                                id="input-description"
                                v-model="form.description"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-calendar @click="changeDateSpan"/>
                    </b-col>
                    <!-- COLONNE MILIEU -->
                    <b-col id="colonneMilieu" class="colonne-page" cols="4">
                        <b-row id="selectGroupTaille" class="input-row">
                            <b-col cols="3">
                                <label for="selectTaille">Taille : </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                id="selectTaille"
                                v-model="form.taille"
                                :options ="tailles"
                                required
                                >
                                </b-form-select>
                            </b-col>
                        </b-row>
                        <b-row id="inputGroupMarque" class="input-row">
                            <b-col cols="3">
                                <label for="inputMarque">Marque : </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                id="inputMarque"
                                v-model="form.marque"
                                :options="marques"
                                required
                                >
                                </b-form-select>
                            </b-col>
                        </b-row>
                        <b-row id="inputGroupCaution" class="input-row">
                            <b-col cols="3">
                                <label for="inputCaution">Caution : </label>
                            </b-col>
                            <b-col>
                                <b-form-input
                                id="inputCaution"
                                type="number"
                                v-model="form.caution"
                                required
                                >
                                </b-form-input>
                            </b-col>
                        </b-row>
                        <b-row id="selectConditionEnvoi" class="input-row">
                            <b-col cols="5">
                                <label for="selectEnvoi">Conditions d'envoi : </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                id="selectEnvoi"
                                v-model="form.conditionEnvoi"
                                :options ="conditionsEnvoi"
                                required
                                >
                                </b-form-select>
                            </b-col>
                        </b-row>
                        <b-row id="selectConditionRetour" class="input-row">
                            <b-col cols="5">
                                <label for="selectRetour">Conditions de retour : </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                id="selectRetour"
                                v-model="form.conditionRetour"
                                :options ="conditionsEnvoi"
                                required
                                >
                                </b-form-select>
                            </b-col>
                        </b-row>
                        <b-form-file
                        id="fileUpload"
                        type="file"
                        ref="file"
                        v-model= "file"
                        >
                        </b-form-file>
                    </b-col>
                     <!-- COLONNE DROITE -->
                    <b-col id="colonneDroite" class="colonne-page" cols="4">
                        <b-row class="input-row">
                            <b-col cols="3">
                                <label id="label-select-type" for="select-type">
                                    Type :
                                </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                    id="select-type"
                                    v-model="form.idType"
                                    :options="types"
                                    required
                                ></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row class="input-row">
                            <b-col cols="3">
                                <label id="label-select-etat" for="select-etat">
                                    Etat :
                                </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                    id="select-etat"
                                    v-model="form.etat"
                                    :options="etat"
                                    required
                                ></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row class="input-row">
                            <b-col cols="3">
                                <label id="label-select-type" for="select-type">
                                    Genre :
                                </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                    id="select-type"
                                    v-model="form.genre"
                                    :options="genre"
                                    required
                                ></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row class="input-row">
                            <b-col cols="3">
                                <label id="label-select-categorie" for="select-categorie">
                                    Catégorie :
                                </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                    id="select-categorie"
                                    v-model="form.categorie"
                                    :options="categories"
                                    required
                                ></b-form-select>
                            </b-col>
                        </b-row>
                        <b-row class="input-row">
                            Prix de location :
                            <br>
                            <b-row class="input-row">
                                <b-col cols="1">
                                    <b-form-checkbox
                                        id="check-montant-jour"
                                        name="check-montant-jour"
                                        v-model="form.checkPrixJour"
                                        switch
                                    ></b-form-checkbox>
                                </b-col>
                                <b-col cols="7">
                                    <b-form-input
                                        id="input-montant-jour"
                                        v-model="form.prixJour"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col cols="4">
                                    <label id="label-montant-jour" for="input-montant-jour">
                                        €/jour
                                    </label>
                                </b-col>
                            </b-row>
                            <b-row class="input-row">
                                <b-col cols="1">
                                    <b-form-checkbox
                                        id="check-montant-semaine"
                                        name="check-montant-semaine"
                                        v-model="form.checkPrixSemaine"
                                        switch
                                    ></b-form-checkbox>
                                </b-col>
                                <b-col cols="7">
                                    <b-form-input
                                        id="input-montant-semaine"
                                        v-model="form.prixSemaine"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col cols="4">
                                    <label id="label-montant-semaine" for="input-montant-semaine">
                                        €/semaine
                                    </label>
                                </b-col>
                            </b-row>
                            <b-row class="input-row">
                                <b-col cols="1">
                                    <b-form-checkbox
                                        id="check-montant-mois"
                                        name="check-montant-mois"
                                        v-model="form.checkPrixMois"
                                        switch
                                    ></b-form-checkbox>
                                </b-col>
                                <b-col cols="7">
                                    <b-form-input
                                        id="input-montant-mois"
                                        v-model="form.prixMois"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col cols="4">
                                    <label id="label-montant-mois" for="input-montant-mois">
                                        €/mois
                                    </label>
                                </b-col>
                            </b-row>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row align-h="center">
                    <b-button id="btn-submit" type="submit">Ajouter</b-button>
                </b-row>
            </b-container>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form.photo }}</pre>
        </b-card>
    </body>
</template>

<script>
const axios = require('axios').default

export default {
  name: 'ajoutVetement',
  data () {
    return {
      form: {
        idProprietaire: 1,
        titre: null,
        marque: null,
        description: null,
        dateDebutDispo: '10-10-2020',
        dateFinDispo: '10-10-2020',
        caution: null,
        conditionEnvoi: null,
        conditionRetour: null,
        idType: null,
        etat: null,
        taille: null,
        genre: null,
        checkPrixJour: false,
        checkPrixSemaine: false,
        checkPrixMois: false,
        prixJour: 10,
        prixSemaine: 10,
        prixMois: 10,
        prix: 10,
        disponible: 1,
        categorie: null,
        photo: null,
        couleur: 'default color',
        localisation: 'default localisation'
      },
      file: null,
      types: [{ text: '--- Choisissez une catégorie ---', value: null }, { text: 'un type', value: '1' }],
      etat: [{ text: '--- Choisissez un état ---', value: null }, { text: 'Neuf', value: 'Neuf' }, { text: 'Très bon état', value: 'Très bon état' }, { text: 'Bon état', value: 'Bon état' }, { text: 'Moyen', value: 'Moyen' }, { text: 'Usé', value: 'Usé' }, { text: 'Mauvais état', value: 'Mauvais état' }],
      genre: [{ text: '--- Choisissez un type ---', value: null }, { text: 'Masculin', value: 'Masculin' }, { text: 'Féminin', value: 'Féminin' }, { text: 'Unisexe', value: 'Unisexe' }],
      conditionsEnvoi: [{ text: '--- Condition d\'envoi ---', value: null }, { text: 'Tout beau tout propre', value: 'Tout beau tout propre' }, { text: 'Lavage obligé mamène', value: 'Lavage obligé mamène' }, { text: 'crado dégueu', value: 'crado dégueu' }],
      tailles: [{ text: '--- Choisissez une taille ---', value: null }, { text: 'XS', value: 'XS' }, { text: 'S', value: 'S' }, { text: 'M', value: 'M' }, { text: 'L', value: 'L' }, { text: 'XL', value: 'XL' }, { text: 'XXL', value: 'XXL' }],
      categories: [{ text: '--- Choisissez une catégorie ---', value: null }, { text: 'Adulte', value: 'Adulte' }, { text: 'Enfant', value: 'Enfant' }],
      marques: [{ text: '--- Choisissez une marque ---', value: null }, { text: 'Lacoste', value: 'Lacoste' }, { text: 'Napapijri', value: 'Napapijri' }, { text: 'Autre', value: 'Autre' }]
    }
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()
      this.form.photo = this.file.name
      console.log(JSON.stringify(this.form))
      var reqData = this.form
      axios.post('http://localhost:3000/vetement', reqData)
        .then(function (rep) {
          console.log(rep)
        })
        .catch(function (err) {
          console.log(err)
        })
      // upload de l'image
      const formData = new FormData()
      formData.append('file', this.file)
      axios.post('http://localhost:3000/upload', formData)
        .then(console.log('Upload Success'))
        .catch(err => console.log(err))
    },
    changeDateSpan: function () {
      console('changedateSpan')
    }
  },
  mounted () {
    const vm = this

    axios.get('http://localhost:3000/type')
      .then(function (res) {
        // on ajoute chaque type de vêtement sauf le type racine
        res.data.forEach(element => {
          if (element.idType !== 1) {
            const tempType = { text: element.label, value: element.idType }
            vm.types.push(tempType)
          }
        })
      })
      .catch(error => console.log(error))
  }
}
</script>

<style>
    #titrePage {
        background-color: #B8D6AA;
        font-size: 2em;
        margin-bottom: 1em;
    }

    #btn-submit{
        color: black;
        font-weight: bold;
        width: 15em;
        background-color: #B8D6AA;
    }
    .input-row {
        margin-bottom: 1em;
    }
</style>
