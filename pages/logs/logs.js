//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    date:'点击选择日期',
    listData:[{
      name:'红双喜(软)',
      num:'5',
      price:'30',
      date:'2019-03-10'
    },
    {
      name:'红双喜(软)',
      num:'5',
      price:'40',
      date:'2019-03-11'
    }]
  },
  onLoad: function () {
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  }
})
