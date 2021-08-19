import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    user
  },
  state: {
    serviceName: '',
    is_browser_first: true
  },
  mutations: {
    SET_SERVICE_NAME: (state, name) => {
      state.serviceName = name
    },
    saveBrowserFirst(state, type) {
      state.is_browser_first = type
    }
  },
  actions: {},
  getters
})

export default store
