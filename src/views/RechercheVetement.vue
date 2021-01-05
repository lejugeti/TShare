<template>
  <div id="body">
    <div id="categorie" class="my-accordion" role="tablist">
      <b-button v-b-toggle.accordion-1 variant="light" role="tab">ACCESSOIRES</b-button>
      <b-button v-b-toggle.accordion-2 variant="light" role="tab">SACS</b-button>
      <b-button v-b-toggle.accordion-3 variant="light" role="tab">VETEMENTS</b-button>
      <b-button v-b-toggle.accordion-4 variant="light" role="tab">CHAUSSURES</b-button>
      <b-button v-b-toggle.accordion-5 variant="light" role="tab">ENFANT</b-button>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">hello1</b-collapse>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">hello2</b-collapse>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">hello3</b-collapse>
      <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">hello3</b-collapse>
      <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">hello3</b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rechercheVetement',
  data () {
    return {}
  }
}
</script>

<style scoped>
@import "./../style/rechercheVetement.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
