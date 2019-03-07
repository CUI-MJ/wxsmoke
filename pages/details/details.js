import download from "../../utils/download.js"
var network  = require('../../utils/network')
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: '',
    type: '',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options) {
      var flagUrl = options.video_url
      wx.setNavigationBarTitle({
        title: options.name
      })
      if (options.type == 3 || options.type == 2) {
        flagUrl = JSON.parse(options.video_url).url
      }
      this.setData({
        videoUrl: flagUrl,
        type: options.type,
        id:options.id,
      })
    }

  },
  downloadFile(e) {
    download.downloadSaveFiles({
      urls: [e.currentTarget.dataset.src],
      success: function (res) {
        wx.openDocument({
          filePath: res,
          success: function (res) {
              console.log('打开文档成功')
          }
      })
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content:'下载失败,请您稍后再试',
        })
      }
    })
  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
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
  videoEnd: function () {
    let that = this;
    let params = {
      train_item_id:that.data.id,
      token:wx.getStorageSync('token'),
    }
    network.postRequest('/index.php?s=/api/train.index/update_train_his',params,res=>{
      if(res.code == 1){
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1000)
       
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
  pause: function (e) {
  },
  timeupdate: function (e) {
  },
  playerror() {
  }
})