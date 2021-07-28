import wepy from '@wepy/core'
const CONFIG = {
  host: 'http://127.0.0.1:7001',
  path: 'mina_app/pounds/'
}
const BASEURL = CONFIG.host + '/' + CONFIG.path

const POST = async (path, data) => {
  wepy.wx.showLoading({ title: '努力请求中' })
  try {
    const response = await wepy.wx.request({
      header: {},
      url: BASEURL + path, //开发者服务器接口地址",
      data: data, //请求的参数",
      method: 'POST',
      data,
      timeout: 20000
      // dataType: 'json' //如果设为json，会尝试对返回的数据做一次 JSON.parse
    })
    // 请求完成
    wepy.wx.hideLoading()
    if (!response) {
      throw '请求异常，没有返回值'
    }
    const code = response.data.code
    // 无权限
    if (code === 403) {
      throw '无权限访问'
    }
    // 服务器出错
    if (code >= 500 && code < 600) {
      throw '请求服务器异常'
    }
    // 开发者服务器返回的 HTTP 状态码
    if (response.statusCode !== 200) {
      if (response.statusCode === 404) {
        throw '请求异常，找不到地址'
      }
      throw '请检查网络是否正常'
    }
    // 请求出错
    if (code !== 200) {
      const msg = response.data.result
      if (typeof msg === 'string') throw msg
      throw '请求接口异常'
    }
    return response.data.result
  } catch (error) {
    setTimeout(() => {
      wepy.wx.showToast({
        title: error,
        icon: 'none',
        duration: 1500
      })
    }, 500)
    return false
  }
}

module.exports = {
  GetUserInfo: (data) => POST('get_user_info', data)
}
