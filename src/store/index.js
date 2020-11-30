import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { dataStore } from './module'

Vue.use(Vuex)

// pour garder les state après actualisations
const dataState = createPersistedState({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  state: {
    idUtilisateur: 0,
    nomUtilisateur: ''
  },
  mutations: {
    connected (state, info) {
      state.idUtilisateur = info.idUt
      state.nomUtilisateur = info.nom
    },
    disconnected (state) {
      state.idUtilisateur = 0
      state.nomUtilisateur = ''
    }
  },
  actions: {
  },
  modules: {
    dataStore
  },
  plugins: [dataState]
})
