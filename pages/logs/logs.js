//logs.js
const util = require('../../utils/util.js')
const app = getApp()
var network = require('../../utils/network')
Page({
  data: {
    days:'选择日期查询',
    month:'选择月份查询',
    date:'',
    pageNum:1,
    pageSize:20,
    pages:0,
    isLoadmore:true,
    isNodata:false,
    listData:[],
    sum:''
  },
  onLoad: function () {
    this.getStockLog()
  },
  getStockLog(){
    let params = {
      userId:wx.getStorageSync("userId"),
      queryDate: this.data.date,
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
    }
    network.getRequest('wechat/stock-log', params,res=>{
      if(res.code == '0000'){
        this.setData({
          listData: this.data.listData.concat(res.data.pageInfo.list),
          isLoadmore:false,
          pages:res.data.pageInfo.pages,
          sum:res.data.sum
        })
        if(this.data.listData.length == 0){
          this.setData({
            isNodata:true
          })
        }else{
          this.setData({
            isNodata:false
          })
        }
      }else{
        wx.showModal({
          content:res.msg,
          showCancel: false,
        });
      }
    },err=>{
    })
  },
  binddaysChange(e){
    this.setData({
      days: e.detail.value,
      month:'选择月份查询',
      date: e.detail.value,
      pageNum:1,
      listData:[]
    })
    this.getStockLog()
  },
  bindmonthChange(e){
    this.setData({
      days:'选择日期查询',
      month:e.detail.value,
      date: e.detail.value,
      pageNum:1,
      listData:[]
    })
    this.getStockLog()
  },
  onReachBottom: function () {
    console.log('到底了')
    console.log(this.data.pageNum,this.data.pages)
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
      this.getStockLog();
    }
  },
})
