import api from '../services/api'

const state = () => ({
  authorized: !!localStorage.getItem('user') || false,
  user: JSON.parse(localStorage.getItem('user')) || {
    'name': '',
    'surname': '',
    'email': '',
  },
})

const getters = {
  GET_USER (state) {
    return state.user
  },

  GET_USER_NAME_FIRST_LETTER (state) {
    if (state.user?.name) {
      return state.user.name[0]
    } else {
      return ''
    }
  },

  IS_AUTH (state) {
    return state.authorized
  },

}

const mutations = {
  SET_USER (state, payload) {
    localStorage.setItem('user', JSON.stringify(payload))
    state.user = payload
    state.authorized = true
  },

  CLEAR_USER (state) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    state.user = null
    state.authorized = false
  },
}

const actions = {

  async LOGIN ({ commit, state, dispatch }, payload) {
    payload['device_type'] = 'web'
    const user = {
      'name': '',
      'surname': '',
      'email': '',
    }
    await api.get(import.meta.env.VITE_HOST_URL + '/sanctum/csrf-cookie')
    await api.post(import.meta.env.VITE_API_URL + '/login', payload)
      .then(async ({ data }) => {
        localStorage.setItem('token', data.token)
        commit('SET_USER', Object.assign(user, data.data))
        window.location.href = '/'
      }).catch(e => {
        console.log(e)
      })
  },

  async SET_USER ({ commit, state }, payload) {
    commit('SET_USER', payload)
  },

  async LOGOUT ({ commit }) {
    await api.post('/logout')
      .finally(() => {
        commit('CLEAR_USER')
        window.location.href = '/login'
      })
  },

}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
