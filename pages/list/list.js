// pages/realExam/realExam.js
var network = require('../../utils/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoadmore:false,
    isNodata:false,
    listData: [],
    pageNum:1,
    pageSize:20,
    pages:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.getMsgList()
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
    var that = this;
    if(!(that.data.pageNum<that.data.pages)){
      that.setData({
        isLoadmore:false,
        isNodata:true,
      });
    }else{
      var number = that.data.pageNum+1;
      that.setData({
        pageNum:number,
        isLoadmore:true,
      });
      this.getMsgList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMsgList(){
    let params = {
      status:1,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
    }
    network.postRequest('notice/list', params,res=>{
      if(res.code =='0000'){
        this.setData({
          listData: this.data.listData.concat(res.data.list),
          isLoadmore:false,
          pages:res.data.pages
        })
        if(this.data.listData.length == 0){
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
  },
  ShowModal(content){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: content,
    })
  },
  goDetails(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: `/pages/details/details?id=${id}`
    })
  }
})