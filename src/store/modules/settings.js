import { getOptions } from '@/api/option'

const getDefaultState = () => {
  return {}
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_OPTIONS: (state, options) => {
    for(const option of options) {
      if (!state[option.group]) {
        state[option.group] = {}
      }
      state[option.group][option.name] = option.value
    }
  },
}

const actions = {
  getOptions({ commit }) {
    return new Promise((resolve, reject) => {
      getOptions().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_OPTIONS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

