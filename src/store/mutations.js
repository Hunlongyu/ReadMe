export const CHANGE_RIGHT = (state, payload) => {
  state.right = payload
}

export const CHANGE_MDURL = (state, payload) => {
  state.right = 'md'
  state.mdUrl = payload
}

export const CHANGE_DBID = (state, payload) => {
  state.dbID = payload
}

export const CHANGE_REFRESH = (state, payload) => {
  state.refresh = payload
}
