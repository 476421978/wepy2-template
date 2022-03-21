import { POST } from './http'

module.exports = {
  // ========================== 通用接口
  // 获取解密微信用户敏感信息
  DecUserInfo: (data) => POST('dec_user_info', data),
  // 获取数据库微信用户信息
  GetWxUserInfo: (data) => POST('get_wx_user_info', data),
  // 获取小程序配置信息
  GetMinaInfo: (data) => POST('get_mina_info', data),
  // 刷新Token
  RefreshToken: (data) => POST('refresh_token', data),

  // ================ 用户管理 删 查
  DeleteUser: (data) => POST('delete_user', data),
  GetUserList: (data) => POST('get_user_list', data)
}
