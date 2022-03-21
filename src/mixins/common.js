import wepy from '@wepy/core'
import { mapState, mapActions } from '@wepy/x'

export default {
  computed: {
    ...mapState(['UserInfo', 'MinaInfo'])
  },
  methods: {
    ...mapActions(['storeSaveUserInfo', 'storeSaveMinaInfo', 'storeCleanUserInfo']),
    // 弹窗提示
    commonToast(title = '弹窗提示', icon = 'none', duration = 2000) {
      wepy.wx.showToast({
        title,
        icon,
        duration
      })
    },
    // 参数解码
    decodeParams(dirty) {
      for (let k in dirty) {
        if (typeof dirty[k] === 'string') dirty[k] = decodeURIComponent(dirty[k])
      }
      return dirty
    },
    // 金额过滤
    FilterPrice(val) {
      return /^[1-9][0-9]?$/.test(val)
    }
  },
  created() {}
}
