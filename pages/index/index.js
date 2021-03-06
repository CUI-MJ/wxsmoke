//index.js
//获取应用实例
const app = getApp()
var network = require('../../utils/network')
Page({
  data: {
    userInfo: {},
    isReg: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shopsGrade:wx.getStorageSync('shopsGrade'),
    pageNum:1,
    pageSize:20,
    pages:0,
    showModal: false,
    inputValue:'',
    listData: [],
    currentData:{},
    isLoadmore:true,
    isNodata:false,
    accounts: ["盒", "条"],
    accountIndex: 0,
  },
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
      this.getstockList();
    }
  },
  getstockList(){
    let params = {
      userId:wx.getStorageSync('userId'),
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
    }
    network.getRequest('wechat/stock', params,res=>{
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
   // this.getstockList();
  },
  onShow: function () {
    this.setData({
      listData:[],
      pageNum:1,
      shopsGrade:wx.getStorageSync('shopsGrade')
    });
    this.getstockList();
  },
  openmodel: function (event) {
    console.log(event.currentTarget.dataset)
    this.setData({
      showModal: true,
      currentData:{
        shopsId:event.currentTarget.dataset.shopsid,
        id:event.currentTarget.dataset.id,
        cigaretteId:event.currentTarget.dataset.cigaretteid
      }
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
    if(!Number(this.data.inputValue)){
      wx.showModal({
        content: '输入格式不正确',
        showCancel: false,
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
            }
        }
      });
      return false
    }
    var obj = {
      operationStock:this.data.inputValue,
      operationUnit:this.data.accountIndex == 0? '盒':'条'
    }
    const params = Object.assign(this.data.currentData,obj)
    console.log(params)
    network.postRequest('shops/reduce-inventory',params,res=>{
      if(res.code == '0000'){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        this.hideModal();
        this.setData({
          listData:[],
          pageNum:1
        })
        this.getstockList();
      }else{
        wx.showModal({
          content:res.msg,
          showCancel: false,
        });
      }
    },err=>{
      
    })
   
  },
  inputChange(e){
    console.log(e)
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
        accountIndex: e.detail.value
    })
  },
})