import { createStore } from 'vuex'

export default createStore({
  state: {
    view: 'star',
    language: 'zh-cn',
    theme: 'light'
  },
  getters: {
    getView: state => {
      return state.view
    },
    getLanguage: state => {
      return state.language
    },
    getTheme: state => {
      return state.theme
    }
  },
  mutations: {
    SET_VIEW: (state, payload) => {
      state.view = payload
    },
    SET_LANGUAGE: (state, payload) => {
      state.language = payload
    },
    SET_THEME: (state, payload) => {
      state.theme = payload
    }
  }
})
