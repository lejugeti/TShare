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
                    </b-col>
                    
                    <!-- COLONNE MILIEU -->
                    <b-col id="colonneMilieu" class="colonne-page" cols="4">
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
                        <b-row id="inputGroupMarque" class="input-row">
                            <b-col cols="3">
                                <label for="inputMarque">Marque : </label>
                            </b-col>
                            <b-col>
                                <b-form-input 
                                id="inputMarque"
                                v-model="form.marque"
                                required
                                >
                                </b-form-input>
                            </b-col>
                        </b-row>   
                        <b-row id="inputGroupCaution" class="input-row">
                            <b-col cols="3">
                                <label for="inputCaution">Caution : </label>
                            </b-col>
                            <b-col>
                                <b-form-input 
                                id="inputCaution"
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
                                v-model="form.conditionsEnvoi"
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
                                v-model="form.conditionsRetour"
                                :options ="conditionsEnvoi"
                                required
                                >
                                </b-form-select>
                            </b-col>
                        </b-row>                   
                    </b-col>

                     <!-- COLONNE DROITE -->
                    <b-col id="colonneDroite" class="colonne-page" cols="4">
                        <b-row class="input-row">
                            <b-col cols="3">
                                <label id="label-select-categories" for="select-categories">
                                    Catégorie : 
                                </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                    id="select-categories"
                                    v-model="form.categorie"
                                    :options="categories"
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
                                    Type : 
                                </label>
                            </b-col>
                            <b-col>
                                <b-form-select
                                    id="select-type"
                                    v-model="form.type"
                                    :options="type"
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
            <pre class="m-0">{{ form }}</pre>
        </b-card>
    </body>
</template>

<script>
import Vue from "vue";
const axios = require("axios").default;

export default {
    name: "ajoutVetement",
    data() {
        return {
            form:{
                titre:"",
                marque:"",
                description:"",
                pathImage:"",
                dateDebut:"10-10-2020",
                dateFin:"10-10-2020",
                caution: null,
                conditionsEnvoi:"",
                conditionsRetour:"",
                categorie: null,
                etat: null,
                type: null,
                checkPrixJour:false,
                checkPrixSemaine:false,
                checkPrixMois:false,
                prixJour: null,
                prixSemaine: null,
                prixMois: null,
                vetementEnfant: false
            },
            categories: [{text:"--- Choisissez une catégorie ---", value: null}, {text:"categorie bg", value: 1}],
            etat: [{text: "--- Choisissez un état ---", value: null}, {text:"Neuf", value: 1}, {text:"Très bon état", value:2}, {text: "Bon état", value:3}, {text:"Moyen", value: 4}, {text:"Usé", value: 5}, {text: "Mauvais état", value:6}],
            type: [{text: "--- Choisissez un type ---", value: null}, {text:"Masculin", value: 1}, {text:"Féminin", value:2}, {text: "Unisexe", value:3}],
            conditionsEnvoi: [{text: "--- Condition d'envoi ---", value: null}, {text:"Tout beau tout propre", value: 1}, {text:"Lavage obligé mamène", value:2}, {text: "crado dégueu", value:3}]
        }
    },
    methods: {
        onSubmit(evt){
            evt.preventDefault();
            console.log(JSON.stringify(this.form));
            axios.
                post("/vetement",
                {
                    
                })
        }
    }
};
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