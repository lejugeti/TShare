<template>
  <div class="main_container">
    <div class="bandeau">
      <p class="bandeau_text">Historique des locations</p>
    </div>

    <div class="row">
      <div class="column_filter">
        <div class="search">
          <b-input placeholder="Rechercher" type="text" v-model="search"></b-input>
        </div>

        <b-form-group label="État" label-cols-lg="2" >
          <b-form-radio-group
            v-model="state"
            class="mt-lg-2"
          >
            <b-form-radio value="En attente" class="col">En attente</b-form-radio>
            <b-form-radio value="En cours" class="col">En cours</b-form-radio>
            <b-form-radio value="Terminée" class="col">Terminée</b-form-radio>
            <b-form-radio value="Annulée" class="col">Annulée</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

          <b-button
          id="btn_clear_filter"
          @click="clear_filter()"
          >
            Enlever les filtres
          </b-button>
      </div>


      <div class="column">
        <div class="row">
          <b-button
            variant="light"
            id="btnSelected"
            v-bind:style= "[isSelected ? {'background-color' : '#B8D6AA'} : {'background-color' : '#ffffff'}]"
            @click="btnSelected('locataire')"
          >
            Locataire
          </b-button>
          <b-button
            variant="light"
            id="btnSelected"
            v-bind:style= "[!isSelected ? {'background-color' : '#B8D6AA'} : {'background-color' : '#ffffff'}]"
            @click="btnSelected('proprio')"
          >
            Propriétaire
          </b-button>
        </div>
        <div class="tab_historique">
          <b-table
            striped
            hover
            :items="items"
            :fields="fields"
            :keyword="search"
          ></b-table>
        </div>
      </div>


    </div>
  </div>
</template>

<script>

export default {
  name: 'HistoriqueView',
  data() {
    return {
      search: '',
      isSelected: true,
      state: '',
      fields: [
        { key: 'article', label: 'Article', sortable: true },
        { key: 'proprietaire', label: 'Propriétaire', sortable: true },
        { key: 'date_de_demande', label: 'Date de demande', sortable: true },
        { key: 'etat', label: 'État', sortable: true },
      ],
      locataire: [
        { article: 'Jean Levis 501', proprietaire: 'Paulune', date_de_demande: '03/11/2020', etat: 'Terminée' },
        { article: 'Polo Lacoste', proprietaire: 'Jean-Eude', date_de_demande: '24/12/2020', etat: 'En cours' },
      ],
      proprio: [
        { article: 'Chemise Rose Zara', proprietaire: 'Moi', date_de_demande: '05/10/2020', etat: 'Annulée' },
      ],
      items: [
        { article: '', proprietaire: '', date_de_demande: '', etat: '' },
      ],
    };
  },
  methods: {
    btnSelected(str) {
      if (str === 'proprio') {
        if (this.isSelected) {
          this.isSelected = !this.isSelected;
        }
      } else if (!this.isSelected) {
        this.isSelected = !this.isSelected;
      }
      this.fetchItems();
    },

    filterItems() {
      const new_items = [];
      console.log(this.state);
      this.items.forEach((item) => {
        if ((this.search === '' || item.article.includes(this.search)) && (this.state === '' || item.etat === this.state)) {
          console.log('cc');
          new_items.push(item);
        }
      });
      this.items = new_items;
    },

    fetchItems() {
      if (this.isSelected) this.items = this.locataire;
      else this.items = this.proprio;
    },

    clear_filter() {
      this.search = '';
      this.state = '';
      this.fetchItems();
    },

  },

  watch: {
    search() {
      this.fetchItems();
      this.filterItems();
    },
    state() {
      this.fetchItems();
      this.filterItems();
    },
  },

  mounted() {
    this.fetchItems();
  },

};
</script>

<style scoped>
@import "./../assets/historique.css";
</style>
