// pages/exam/exam.js
var network = require('../../utils/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkdata: [],
    countDownMinute: 0,
    countDownSecond: 0,
    current: '',
    isHasTime: false,
    newdata: [],
    isSetStorage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options) {
      this.setData({
        current: options.question_id,
        answer:options.answer
      });
      that.getQuestioin(options.question_id)
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
  // 习题接口
  getQuestioin(question_id) {
    var that = this;
    let params = {
      question_id: question_id
    }
    network.postRequest('/index.php?s=/api/train.index/getQuestioin', params, res => {
      var content = [res.data.content]
      var checkdata = [];
      if (res.code == 1) {
        content.forEach((item) => {
          var obj = {};
          obj.title = item.title;
          obj.id = item.id
          obj.items = [];
          for (var k of item.questionselect.split('&&')) {
            obj.items.push({
              name: k.split(':')[0],
              value: k.split(':')[1]
            })
          }
          checkdata.push(obj)
        })
        that.setData({
          checkdata: checkdata,
        });
        that.dataDisplay()

      }
    }, err => {
    })
  },
  // 点击表单提交
  submit: function () {
    var that = this;
    var storage = wx.getStorageSync('answerList');
    var data = ''
    if(that.data.newdata.length == 0){
      data = that.data.checkdata
    }else{
      data = that.data.newdata
    }
    for(var key of data[0].items){
      if(key.checked && key.name == that.data.answer ){
          this.setData({
            isSetStorage: true,
          });
        }
    }
    if(!that.data.isSetStorage){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content:'回答错误,请从新作答',
      })
      return false
    }
    //先校验答案是否正确再存缓存
    if (storage && storage.length > 0) {
      storage.some((sKey,sNum)=>{
        that.data.newdata.forEach((nKey)=>{
          if(sKey.id == nKey.id){
            storage[sNum] = nKey
          }else{
            storage.push(nKey)
          }
        })
      })
      wx.setStorageSync('answerList', storage)
      //返回上一页
      wx.navigateBack({
        delta: 1
      })      
    } else {
      var answerList = [];
      for (var key of that.data.newdata) {
        answerList.push(key)
      }
      wx.setStorageSync('answerList', answerList)
      wx.navigateBack({
        delta: 1
      })   
    }
  },
  // 点击单选框
  radioChange(e) {
    var that = this;
    var newdata = that.data.checkdata;
    var ID = e.detail.value.split(',')[0];
    var name = e.detail.value.split(',')[1];
    that.data.checkdata.forEach((item, position) => {
      if (item.id == ID) {
        newdata[position].items.forEach((value) => {
          if (value.name == name) {
            value.checked = true;
          }else{
            value.checked = false;
          }
        })
      }
    })
    this.setData({
      newdata: newdata
    });
  },
  //数据回显
  dataDisplay() {
    var that = this;
    var storage = wx.getStorageSync('answerList');
    var newcheckdatas = that.data.checkdata;
    if(storage){
      storage.forEach((skey) => {
        newcheckdatas.forEach((nkey,nNum)=>{
          if(skey.id == nkey.id){
            newcheckdatas[nNum] = skey
          }
        })
      })
    }
    that.setData({
      checkdata: newcheckdatas,
    });
  }
})