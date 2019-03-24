var network = require('../../utils/network')
const app = getApp()
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getPhoneNumber'),
    days: '选择日期查询',
    month:'选择月份查询',
    pageNum: 1,
    pageSize: 10,
    pages: 0,
    isLoadmore: true,
    isNodata: false,
    listData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getcigsales();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // wx.showLoading({
    //   title: '加载中',
    // })
    // setTimeout(function () {
    //   var userInfo = app.globalData.userInfo 
    //   that.setData({
    //     userInfo: userInfo
    //   })
    //   wx.hideLoading()
    // }, 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      listData:[],
      pageNum:1,
    });
    this.getcigsales();
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
  getcigsales() {
    let params = {
      userId: wx.getStorageSync("userId"),
      queryDate: this.data.date != '选择日期查询' ? this.data.date : '',
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
    }
    network.getRequest('wechat/cig-sales', params, res => {
      if (res.code == '0000') {
        this.setData({
          listData: res.data,
          isLoadmore: false,
        })
        if (this.data.listData.length == 0) {
          this.setData({
            isNodata: true
          })
        } else {
          this.setData({
            isNodata: false
          })
        }
      } else {
        wx.showModal({
          content: res.msg,
          showCancel: false,
        });
      }

    }, err => {

    })
  },
  binddaysChange(e){
    this.setData({
      days: e.detail.value,
      month:'选择月份查询',
      date: e.detail.value,
    })
    this.getcigsales()
  },
  bindmonthChange(e){
    this.setData({
      days:'选择日期查询',
      month:e.detail.value,
      date: e.detail.value,
    })
    this.getcigsales()
  }
})