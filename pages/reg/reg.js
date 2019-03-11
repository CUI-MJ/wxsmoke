const network = require('../../utils/network')
const md5 = require('../../utils/md5')
const app = getApp()

Page({
  data: {
    regs: {},
    hasPhoneNumber: false,
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    password: '',
    telPhone: '',
    isshowText:false

  },
  onLoad: function () {
  },
  submit() {
    if (this.data.telPhone == '') {
      wx.showModal({
        content: '请填写手机号',
        showCancel: false,
      });
      return false;
    }
    if (this.data.password == '') {
      wx.showModal({
        content: '请填写密码',
        showCancel: false,
      });
      return false;
    }
    if (this.checkPhone()) {
      return false;
    }
    let params = {
      phone: this.data.telPhone,
      password: md5.hexMD5(this.data.password),
      code:app.globalData.code
    }
    network.postRequest('/wechat/login-wechat', params, res => {
       console.log(res)
       if(res.code == '0000'){
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('userId', res.data.userId)
          wx.switchTab({
            url: "/pages/index/index"
          })
       }else{
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.msg,
        })
       }
    }, err => {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '网络错误，请稍后再试',
      })
    })

  },
  bindKeyInput(e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  checkPhone() {
    var that = this;
    var phone = this.data.telPhone
    if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phone))) {
      wx.showModal({
        content: '手机号码有误，请重填',
        showCancel: false,
        success: function (res) {
          that.setData({
            telPhone: ''
          })
        }
      });
      return false;
    }
  }
})