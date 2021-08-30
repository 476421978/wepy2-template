/**
 * 微信自带缓存
 */
import wepy from '@wepy/core'
export default {
  methods: {
    // ============== 微信缓存
    // 设置缓存
    setStorage(key, data) {
      return wepy.wx.setStorageSync(key, data)
    },
    // 获取缓存
    getStorage(key) {
      return wepy.wx.getStorageSync(key)
    },
    // 删除缓存
    removerStorage(key) {
      return wepy.wx.removerStorageSync(key)
    },
    // 清除缓存
    clearStorageSync() {
      return wepy.wx.clearStorageSync()
    }
  }
}
