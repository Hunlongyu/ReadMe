export const openMd = ({ commit }, payload) => {
  commit('CHANGE_MDURL', payload)
}

export const actTwo = ({ commit }, payload) => {
  commit('CHANGE_TWO_LOG', payload)
}

export const actThree = ({ commit }, payload) => {
  commit('CHANGE_THREE_LOG', payload)
}
