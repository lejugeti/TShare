<template>
  <div>
    <greenline title="Connexion"/>
    <div class="form-container">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
        </b-form-group>
        <div class="submit-group">
          <b-button type="submit" variant="primary">Se connecter</b-button>
        </div>
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
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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
</style>
