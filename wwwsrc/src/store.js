import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)
//on deploy put heroku link at end of T
let baseUrl = location.host.includes('localhost') ? '//localhost:5000/' : '/'

let auth = Axios.create({
  baseURL: baseUrl + "account/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
})
// user, all keeps, active keep, active  user's keep, active vault, active vault's, keeps active user's vaults
export default new Vuex.Store({
  state: {
    user: {},
    publicKeeps: {},
    activeKeep: {},
    activeUserKeeps: {},
    activeUserVaults: {},
    activeVault: {},
    activeVaultKeeps: {},
  },
  //Write mutations for all states
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setPublicKeeps(state, publicKeeps) {
      state.publicKeeps = publicKeeps
    },
    setActiveKeep(state, activeKeep) {
      state.activeKeep = activeKeep
    },
    setActiveUserKeeps(state, activeUserKeeps) {
      state.activeUserKeeps = activeUserKeeps
    },
    setActiveVaultKeeps(state, activeVaultKeeps) {
      state.activeVaultKeeps = activeVaultKeeps
    },
    setActiveVault(state, activeVault) {
      state.activeVault = activeVault
    },
    setActiveUserVaults(state, activeUserVaults) {
      state.activeUserVaults = activeUserVaults
    },

  },
  actions: {
    //auth
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('[registration failed] :', e)
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('not authenticated')
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('Login Failed')
        })
    }
  },
  logout({ commit, dispatch }) {
    auth.delete('logout')
      .then(res => {
        router.push({ name: 'home' })
        commit('setUser', {})
      })
  },
  //gets
  getAllKeeps({ commit, dispatch }) {
    api.get('/keeps/')
      .then(res => {
        commit("setPublicKeeps")
      })
      .catch(err => console.log('Unable to get any keeps...'))
  },
  getKeeps({ commit, dispatch }) {
    api.get('/keeps/user')
      .then(res => {
        commit("setActiveUserKeeps")
      })
      .catch(err => console.log('Unable to get your keeps...'))
  },
  getVaults({ commit, dispatch }) {
    api.get('/vaults/')
      .then(res => {
        commit("setActiveUserVaults", res.data)
      })
      .catch(err => console.log('Unable to your vaults...'))
  },
  getVaultKeeps({ commit, dispatch }, vaultId) {
    api.get('/vault/' + vaultId)
      .then(res => {
        commit("setActiveVaultKeeps", res.data)
      })
    router.push({ name: 'vault', params: { vaultId: vaultId } })
  },
  getActiveUserKeeps({ commit, dispatch }) {
    api.get('/keeps/user')
      .then(res => {
        commit("setActiveUserKeeps", res.data)
      })
    router.push({ name: 'keeps' })
  },
  //get keeps for user with no push , may not use
  getUsersKeeps({ commit, dispatch }) {
    api.get('/keeps/user')
      .then(res => {
        commit("setActiveUserKeeps", res.data)
      })
  },
  //adds
  addKeep({ commit, dispatch }, payload) {
    api.post('/keeps/', payload)
      .then(res => {
        dispatch('getKeeps')
      })
  },
  addVault({ commit, dispatch }, payload) {
    api.post('/vaults/', payload)
      .then(res => {
        dispatch('getVaults')
      })
  },
  addToVault({ commit, dispatch }, payload) {
    api.post('/vault/', payload)
      .then(res => {
        dispatch('getVaultKeeps')
      })
    console.log('Keep added to vault')
  },
  //delete
  deleteKeep({ commit, dispatch }, keepId) {
    api.delete('/keeps/', keepId)
      .then(res => {
        dispatch('getKeeps')
      })
    Console.log('Keep deleted')
  },
  deleteVault({ commit, dispatch }, vaultId) {
    api.delete('/vaults/', vaultId)
      .then(res => {
        dispatch('getVaults')
      })
    Console.log('Vault deleted')
  },
  deleteVaultKeep({ commit, dispatch }, keepInVault) {
    api.put('/vault/', keepInVault)
      .then(res => {
        dispatch('getVaultKeeps', keepInVault.vaultId)
      })
    console.log('Keep has been deleted from vault')
  },
  //basic route push
  vaultsRoute() {
    router.push({ name: 'vaults' })
  },
  homeRoute() {
    router.push({ name: 'home' })
  },
  loginRoute() {
    router.push({ name: 'login' })
  }
})
