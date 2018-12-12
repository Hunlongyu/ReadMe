import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
  state: {
    view: 'md'
  },
  mutations: {},
  actions: {},
  getters: {}
}

const moduleB = {
  state: {},
  mutations: {},
  actions: {},
  getters: {}
}

const store = new Vuex.Store({
  modules: {
    r: moduleA,
    c: moduleB
  }
})
export default store
// export default new Vuex.Store({
//   state: {

//   },
//   mutations: {

//   },
//   actions: {

//   }
// })
