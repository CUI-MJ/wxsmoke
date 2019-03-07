// pages/realExam/realExam.js
var network = require('../../utils/network')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkdata: [],
    countDownMinute: '00',
    countDownSecond: '00',
    title:'',
    newdata:'',
    isHasTime:false,
    examId:'',
    time_num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExam()
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
  CountDown(totalSecond) {
    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.saveExam();
        wx.showToast({
          title: '考试结束',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
  getExam(){
    //试卷接口
    network.postRequest('/index.php?s=/api/train.index/getExam',{},res=>{
      if(res.code == 1){
        this.CountDown((res.data.content.exam.time_num)*60)
        this.setData({
          title:res.data.content.exam.name,
          checkdata:this.formatData(res.data.content.questions),
          isHasTime:true,
          examId:res.data.content.exam.id,
          time_num:res.data.content.exam.time_num,
        })
      }else{
        that.ShowModal(res.msg)
      }
    },err=>{
      that.ShowModal('网络错误,请您稍后再试')
    })
  },
  formatData(array){
    var checkdata = []
    array.forEach((item) => {
      var obj = {};
      obj.title = item.title;
      obj.id = item.id
      obj.no = item.no
      obj.items = [];
      for (var k of item.questionselect.split('&&')) {
        obj.items.push({
          name: k.split(':')[0],
          value: k.split(':')[1]
        })
      }
      checkdata.push(obj)
    })
    return checkdata
  },
  // 点击单选框
  radioChange(e) {
    var that = this;
    var newdata = that.data.checkdata;
    var ID = e.detail.value.split(',')[0];
    var name = e.detail.value.split(',')[1];
    var no = e.detail.value.split(',')[2];
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
  saveExam(){
    var that = this;
    var selectData = [];
    if(this.data.newdata.length == 0 || !this.data.newdata){
       that.ShowModal('请您作答试题')
       return false;
    }
    this.data.newdata.forEach((key)=>{
      var obj = {}
      obj.title = key.title;
      obj.id = key.id;
      obj.no = key.no;
      for(var i of key.items){
        if(i.checked){
          obj.select = i.name;
          selectData.push(obj)
        }
      }
    })
    var totalTime = this.data.time_num*60 - ((this.data.countDownMinute * 60 ) + Number(this.data.countDownSecond) )
    let params = {
      id: this.data.examId,
      token:wx.getStorageSync('token')?wx.getStorageSync('token'):'oV2AN5OfGQBKL2tM3oAmJdYiA_1Y',
      total_time:totalTime,
      answer: selectData
    }
    network.postRequest('/index.php?s=/api/train.index/saveExam',params,res=>{
      var ret = res.data.content;
      if(ret.is_pass == 1){
        //提交成功就跳课程列表页面
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: ret.msg,
          success:function(){
            wx.switchTab({
              url: "/pages/course/course"
            })
          }
        })
        
      }else{
        that.ShowModal(ret.msg)
      }
    },err=>{
      that.ShowModal('网络错误,请您稍后再试')
    })
  },
  ShowModal(content){
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: content,
    })
  },
})