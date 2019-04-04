// pages/realExam/realExam.js
var network = require('../../utils/network')
var sliderWidth = 123; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoadmore:false,
    isNodata:false,
    isMsgLoadmore:false,
    isMsgNodata:false,
    msgData:[],
    listData: [],
    pageNum:1,
    pageSize:20,
    pages:0,
    openId:'',
    isOpenInput:false,
    inputvalue:'',
    // tab栏切换
    tabs: ['学习园地','信息采集'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
        success: function(res) {
            console.log((res.windowWidth / that.data.tabs.length - sliderWidth) / 2)
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });
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
    this.getMarketPriceInfo()
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
  },
  openInput(e){
    if(this.data.isOpenInput){
      return false;
    }
    let id = e.currentTarget.dataset.id
    let marketPrice = e.currentTarget.dataset.marketprice
    this.setData({
      openId: id,
      inputvalue: marketPrice ? marketPrice :'',
      isOpenInput:true,
    });
  },
  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
    });
  },
  getMarketPriceInfo(){
    let params = {
      shopsId:wx.getStorageSync("shopsId")
    }
    network.getRequest('wechat/market-price-info',params,res=>{
      if(res.code == '0000' ){
        this.setData({
          msgData: res.data,
          isMsgLoadmore:false,
        })
        if(this.data.listData.length == 0){
          this.setData({
            isMsgNodata:true,
          })
        }
      }else{
        wx.showModal({
          content:res.msg,
          showCancel: false,
          isMsgLoadmore:false,
        });
      }
      
    },err=>{
      
    })
  },
  bindfocus(e){
  },
  bindblur(e){
    var that = this;
    if(!Number(e.detail.value)){
      return false
    }
    let params = {
      id:that.data.openId,
      marketPrice:e.detail.value,
    }
    network.postRequest('wechat/save-market-price', params,res=>{
      if(res.code =='0000'){
        setTimeout(()=>{
          this.setData({
            isOpenInput:false
          });
          that.getMarketPriceInfo()
        },500)
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