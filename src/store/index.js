import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUtilisateur: 0,
    nomUtilisateur: 'Jean Heimard'
  },
  mutations: {
    connected (state, info) {
      state.idUtilisateur = info.idUt
      state.nomUtilisateur = info.nom
    }
  },
  actions: {
  },
  modules: {
  }
})
