import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
console.log(state)
import * as getters from './getters'
console.log(getters)
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    state,
    getters,
    mutations,
    actions
  }
})
