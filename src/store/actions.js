export const actOne = ({ commit }, payload) => {
  commit('CHANGE_ONE_LOG', payload)
}

export const actTwo = ({ commit }, payload) => {
  commit('CHANGE_TWO_LOG', payload)
}

export const actThree = ({ commit }, payload) => {
  commit('CHANGE_THREE_LOG', payload)
}
