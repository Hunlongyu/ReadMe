import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    view: 'add'
  },
  mutations: {
    changeView (state, v) {
      state.view = v
    }
  },
  actions: {

  }
})
