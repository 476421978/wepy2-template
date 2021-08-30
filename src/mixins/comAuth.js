/**
 * 微信授权通用方法
 */

import wepy from '@wepy/core'
import API from '@/api'
import store from '@/store'
export default {
  methods: {
     // 解密手机号
    async comAuthUserPhone(e) {
      const l = await this.comAuthLogin()
      const res = await this.comAuthDecUserInfo(l.code, e.$wx.detail.encryptedData, e.$wx.detail.iv, 'Phone')
    },
    // 登录
    async comAuthLogin() {
      const res = await wepy.wx.login()
      if (!res) throw '登录失败'
      return res
    },
    // 弹窗授权页面
    async comAuthUserProfile() {
      const cipherUserInfo = await wepy.wx.getUserProfile({
        desc: '用于认证资料'
      })
      if (!cipherUserInfo) throw '授权失败'
      return cipherUserInfo
    },
    // 解密用户信息
    async comAuthUserInfo() {
      try {
        const [l, u] = await Promise.all([this.comAuthLogin(), this.comAuthUserProfile()])
        const res = await this.comAuthDecUserInfo(l.code, u.encryptedData, u.iv, 'UserInfo')
        store.dispatch('storeSaveUserInfo', res)
        wepy.wx.setStorageSync('WX_USER_INFO', res)
        wepy.wx.showToast({
          title: '授权成功'
        })
      } catch (error) {
        wepy.wx.showToast({
          title: error,
          icon: 'none'
        })
      }
    },
    // 接口解密用户信息信息
    async comAuthDecUserInfo(code, data, iv, type) {
      const res = await API.DecUserInfo({
        type: type,
        code: code,
        encryptedData: data,
        iv: iv
      })
      if (!res) throw '解密失败'
      return res
    },
    // 退出登录
    async comAuthLoginOut() {
      await wepy.wx.clearStorageSync()
      await store.dispatch('storeCleanUserInfo')
      wepy.wx.showToast({
        title: '退出成功'
      })
    }
  }
}
