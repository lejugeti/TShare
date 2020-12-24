import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// pour garder les state après actualisations
const dataState = createPersistedState({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  state: {
    idUtilisateur: 0,
    nomUtilisateur: '',
    prenomUtilisateur: ''
  },
  mutations: {
    connected (state, info) {
      state.idUtilisateur = info.idUt
      state.nomUtilisateur = info.nom
      state.prenomUtilisateur = info.prenom
    },
    disconnected (state) {
      state.idUtilisateur = 0
      state.nomUtilisateur = ''
    },
    setPrenomUtilisateur (state, prenom) {
      state.prenomUtilisateur = prenom
    },
    setNomUtilisateur (state, nom) {
      state.nomUtilisateur = nom
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [dataState]
})
