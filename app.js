var network  = require('./utils/network')
console.log(network)
//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code;
        if (this.codeIdCallback){
          this.codeCallback(res);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (options) {
    if(!wx.getStorageSync('userId')){
      wx.navigateTo({
        url: "/pages/reg/reg"
      })
    }
  },
  globalData: {
    userInfo:'',
    appid:'wx065ccb0ff5d1ac3b',
    secret:'bc7c6238ce1c729b5a5e614becce3afd',
    code:'',
  }
})