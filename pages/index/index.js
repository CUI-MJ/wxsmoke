//index.js
//获取应用实例
const app = getApp()
var network = require('../../utils/network')
Page({
  data: {
    userInfo: {},
    isReg: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageNum:1,
    pageSize:20,
    showModal: false,
    inputValue:'',
    listData: [{
        id: 1,
        name: '中华',
        tradePrice: '100',
        retailPrice: '120',
        stockNum: '-5'
      },
      {
        id: 2,
        name: '中华(软)',
        tradePrice: '100',
        retailPrice: '120',
        stockNum: '5'
      },
      {
        id: 3,
        name: '中华',
        tradePrice: '100',
        retailPrice: '120',
        stockNum: '-10'
      },
      {
        id: 4,
        name: '中华(软)',
        tradePrice: '100',
        retailPrice: '120',
        stockNum: '10'
      }
    ]
  },
  getstockList(){
    let params = {
      userId:wx.getStorageSync('userId'),
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
    }
    network.getRequest('wechat/stock', params,res=>{
      console.log(res)
    },err=>{
      
    })
  },
  //事件处理函数
  bindViewTap: function () {
    if (this.data.audit_status) {
      if (this.data.audit_status == 2 && this.data.is_reg == 1) {
        wx.switchTab({
          url: "/pages/course/course", // 如果本地缓存有信息证明登陆过
        })
      } else {
        wx.navigateTo({
          url: '../reg/reg'
        })
      }
    }
  },
  onLoad: function () {
    this.getstockList();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     if (wx.getStorageSync('userInfo') && (wx.getStorageSync('isReg') == 1) && wx.getStorageSync('token')) {
    //       wx.switchTab({
    //         url: "/pages/course/course", // 如果本地缓存有信息证明登陆过
    //       })
    //     } else {
    //       if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
    //         return wx.navigateTo({
    //           url: '../reg/reg'
    //         })
    //       }
    //       this.setData({
    //         hasUserInfo: false,
    //         canIUse: true,
    //       })
    //     }
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

  },
  openmodel: function (event) {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.hideModal();
  },
  inputChange(event){
    this.setData({
      inputValue: e.detail.value
    })
  }
})