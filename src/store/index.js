import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUtilisateur: 0,
    nomUtilisateur: 'Jean Heimard'
  },
  mutations: {
    connected (idUt, nom) {
      this.idUtilisateur = idUt
      this.nomUtilisateur = nom
    }
  },
  actions: {
  },
  modules: {
  }
})
