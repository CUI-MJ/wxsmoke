// pages/course/course.js
var page = 0;
var network  = require('../../utils/network')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl: '../../images/banner.jpg',
    scrollTop: 0,
    scrollHeight:0,
    isLoadmore:true,
    isNodata:false,
    totalPage:2,
    currentpage:1,
    materials:[],
    lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // this.getscrollHeight();
     this.getCourse()
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
  getCourse:function(){
    var that = this;
    let params = {
      code:app.globalData.code
    }
    network.postRequest('/index.php?s=/api/train.index/getIndexContent',params,res=>{
        var newdata = res.data.trainning;
        var newmaterials = res.data.study_materials
        for(var key of  newdata){
          key.create_time = key.create_time.split(' ')[0]
        }
        for(var key of  newmaterials){
          key.create_time = key.create_time.split(' ')[0]
        }
        if(res.code == 1){
          that.setData({
            bannerUrl:res.data.banner,
            lists:newdata,
            isLoadmore:false,
            materials:newmaterials,
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
    },err=>{
       wx.showToast({
        title:'网络错误请稍后再试',
        icon: 'none',
        duration: 2000
      })
    }) 
  },
  bindDownLoad: function (event) {
    var that = this;
    if(!(that.data.currentpage<that.data.totalPage)){
      that.setData({
        isLoadmore:false,
        isNodata:true,
      });
    }else{
      var number = that.data.currentpage+1;
      that.setData({
        currentpage:number,
        isLoadmore:true,
      });
      that.loadMore();
    }
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function (event) {
    var that = this;
    //该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    this.setData({
      lists: [],
      scrollTop: 0,
      currentpage:0,
    });
    that.loadMore('top');
  },
  loadMore:function(temp){
     var that = this
     if(temp == 'top'){
       var newdata = this.data.listagin;
     }else{
       var newdata = that.data.lists.concat(that.data.lists)
     }
     
     that.setData({
      lists:newdata,
      isLoadmore:false,
     });
  },
  getscrollHeight(){
    var that = this;
    //这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success:function(res) {
        that.setData({
          scrollHeight:res.windowHeight
        });
      }
    });
  },
  gopage:function(event){
  },
  
})