import wepy from '@wepy/core'
import store from '@/store'

const CONFIG = {
  host: 'http://127.0.0.1:7001',
  path: 'mina/'
}
const BASEURL = CONFIG.host + '/' + CONFIG.path

const POST = async (path, data) => {
  wepy.wx.showLoading({ title: '努力请求中' })
  let headerParm = {} // 请求头
  try {
    // 拉取本地用户信息 重新保存store
    if (path === 'get_wx_user_info') {
      const userInfo = await wepy.wx.getStorageSync('WX_USER_INFO')
      if (!userInfo) throw '已过期,请重新授权'
      headerParm.refToken = userInfo.refToken
      store.dispatch('storeSaveUserInfo', userInfo)
    }

    headerParm.token = store.state.UserInfo.token || undefined

    const response = await wepy.wx.request({
      header: headerParm,
      url: BASEURL + path, //开发者服务器接口地址",
      data: data, //请求的参数",
      method: 'POST',
      data,
      timeout: 20000
      // dataType: 'json' //如果设为json，会尝试对返回的数据做一次 JSON.parse
    })
    wepy.wx.hideLoading()
    // 获取返回体
    return isReqNormal(response, path)
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

// 正常返回数据
const isReqNormal = async (response, path) => {
  let isRefreshing = false // 正在刷新Token
  let requests = [] // 存储待重发请求的数组
  // 请求正常
  if (!response) {
    throw '请求异常，没有返回值'
  }
  if (response.statusCode !== 200) {
    if (response.statusCode === 404) {
      throw '请求异常，找不到地址'
    }
    throw '请检查网络是否正常'
  }

  const code = response.data.code
  const result = response.data.result

  // 4002 refToken 接着刷新一次
  if (code === 4002 && path !== 'refresh_token') {
    if (!isRefreshing) {
      isRefreshing = true
      return refreshToken()
        .then((res) => {
          // 获取存储用户信息
          let userInfo = store.state.UserInfo
          userInfo.token = res.token
          userInfo.refToken = res.Token
          // 更新用户token存储信息
          store.dispatch('storeSaveUserInfo', userInfo)
          wepy.wx.setStorageSync('WX_USER_INFO', userInfo)

          // // token 刷新后将数组的方法重新执行
          requests.forEach((cb) => cb())
          requests = [] // 重新请求完清空

          return POST(path, data)
        })
        .catch((err) => {
          console.log('抱歉，您的登录状态已失效，请重新登录！')
          return Promise.reject(err)
        })
        .finally(() => {
          isRefreshing = false
        })
    } else {
      // 返回未执行 resolve 的 Promise
      return new Promise((resolve) => {
        // 用函数形式将 resolve 存入，等待刷新后再执行
        requests.push(() => {
          resolve(POST(path, data))
        })
      })
    }
  }
  // 正常错误提示 返回
  if (code !== 200 && code !== 4002) {
    throw codeStatus(code, result)
  }
  return result
}

// code 详情
const codeStatus = function (code, result) {
  let errInfo = '请求接口出错'
  // 默认常见类型
  switch (code) {
    case 403:
      errInfo = '无权限请求'
      break
    case 404:
      errInfo = '找不到页面'
      break
    case 412:
      errInfo = '请求头出错'
      break
    case 500:
      errInfo = '服务器请求出错'
      break
    default:
      break
  }
  // 错误信息 重定向
  if (typeof result === 'string') {
    errInfo = result
  }
  // 返回错误信息
  return errInfo
}

// 刷新令牌
const refreshToken = async function () {
  return POST('refresh_token')
}

export { POST }
