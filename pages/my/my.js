var network  = require('../../utils/network')
const app = getApp()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasPhoneNumber:false,
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    userName:'',
    compony:'',
    tel:'',
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 个人中心接口
    this.getMember();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      var userInfo = app.globalData.userInfo 
      that.setData({
        userInfo: userInfo
      })
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindKeyInput(e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  getMember(){
    let params = {
      //应该从全局拿
      openid:'o_Qpd5YbrziQ6IfreLgypvxC7TDk'
    }
    network.postRequest('/index.php?s=/api/train.index/getMember',params,res=>{
      var newlist = res.data.list;
      for(var key of newlist){
         key.create_time = key.create_time.split(' ')[0]
      }
      console.log(newlist)
      if(res.code == 1){
        this.setData({
          userName:res.data.user.nick_name,
          company:res.data.user.company,
          tel:res.data.user.tel,
          listData:newlist
        })
      }else{

      }
    },err=>{
      console.log(err)
    })
  }
})