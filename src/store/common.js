import Vuex from '@wepy/x'

export default new Vuex.Store({
  state: {
    UserInfo: {}, // 用户信息
    MinaInfo: {}, // 小程序信息
    cornerMark: undefined // 角标
  },
  mutations: {
    saveUserInfo(state, val) {
      state.UserInfo = val
    },
    saveMinaInfo(state, val) {
      state.MinaInfo = val
    },
    saveCornerMark(state, val) {
      state.cornerMark = val
    },
    cleanUserInfo(state) {
      state.UserInfo = {}
    }
  },
  actions: {
    storeSaveUserInfo({ commit }, val) {
      commit('saveUserInfo', val)
    },
    storeSaveMinaInfo({ commit }, val) {
      commit('saveMinaInfo', val)
    },
    storeSaveCornerMark({ commit }, val) {
      commit('saveCornerMark', val)
    },
    storeCleanUserInfo({ commit }) {
      commit('cleanUserInfo')
    }
  }
})
