
var network  = require('../../utils/network')
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:1,
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options) {
      this.setData({
        id: options.id,
      });
      that.getDetails()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  getDetails(){
    network.getRequest(`notice/${this.data.id}`,{},res=>{
      if(res.code == '0000'){
        
        console.log(res.data)
        this.setData({
          listData: res.data,
        })
        if(res.data.length == 0){
          this.setData({
            isNodata:true,
          })
        }
      }else{
        wx.showModal({
          content:res.msg,
          showCancel: false,
          isLoadmore:false,
        });
      }
      
    },err=>{
      
    })
  }
})