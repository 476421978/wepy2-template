import Vuex from '@wepy/x'

export default new Vuex.Store({
  state: {
    counter: 0
  },
  // 必须同步执行 专注于修改State
  mutations: {
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  },
  //  专注返回state
  getters: {
    counter: (state) => state.counter
  },
  // 可以异步 业务代码、异步请求，触发mutations
  actions: {
    increment({ commit }) {
      commit('increment')
    },
    decrement({ commit }) {
      commit('decrement')
    },
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
