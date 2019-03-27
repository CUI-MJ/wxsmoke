/**
 * url:请求的url
 * params:请求参数
 * message:loading提示信息
 * success:成功的回调
 * fail:失败的回调
 */
//https://membert.chinajinmao.cn/cig/
const host = 'https://membert.chinajinmao.cn/cig/'
// const host ="http://mytrain2.shsmiles.com"
//post请求

// loading配置，请求次数统计
function startLoading() {
    wx.showLoading({
      title: 'Loading...',
      icon: 'none'
    })
  }
  function endLoading() {
    wx.hideLoading();
  }
  // 声明一个对象用于存储请求个数
  var needLoadingRequestCount = 0;
  function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
      startLoading();
    }
    needLoadingRequestCount++;
  };
  function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
      endLoading();
    }
  };
  

function postRequest(url, params, success, fail) {
    this.postRequestLoading(url, params, "", success, fail)
}

//根据判断message 是否显示loading
function postRequestLoading(url, params, message, success, fail) {
    if (message != "") {
        wx.showLoading({
            title: message,
        })
    }
    wx.showNavigationBarLoading();
    showFullScreenLoading();
    const postRequestTask = wx.request({
        url: host + url,
        data: Object.assign({appId:'wxc301d72d99dd6b36'}, params),
        header: {
            'Content-Type': 'application/json',
            'cookie':"token=" + wx.getStorageSync("token")
        },
        method: 'POST',
        success: function (res) {
            if (message != "") {
                wx.hideLoading()
            }
            if (res.statusCode == 200) {
                if(res.data.code == '0001'){
                    wx.showToast({
                        title: "请重新登录",
                        icon: "none"
                    });
                    wx.navigateTo({
                        url: "/pages/reg/reg"
                    });
                }else{
                    success(res.data)
                }
            } else {
                fail(res)
            }
            tryHideFullScreenLoading();
        },
        fail: function (res) {
            if (message != "") {
                wx.hideLoading()
            }
            fail(res)
            tryHideFullScreenLoading();
        },
        complete: function () {
            wx.hideNavigationBarLoading();
        }
    })
}

//get请求
function getRequest(url, params, success, fail) {
    this.getRequestLoading(url, params, "", success, fail)
}

function getRequestLoading(url, params, message, success, fail) {
    if (message != "") {
        wx.showLoading({
            title: message,
        })
    }
    wx.showNavigationBarLoading();
    showFullScreenLoading();
    const getRequestTask = wx.request({
        url: host + url,
        data: Object.assign({appid:'wx92a3d222a4b07756'}, params),
        header: {
            'Content-Type': 'application/json',
            'cookie':"token=" + wx.getStorageSync("token")
        },
        method: 'GET',
        success: function (res) {
            if (message != "") {
                wx.hideLoading()
            }
            if (res.statusCode == 200) {
                if(res.data.code == '0001'){
                    wx.showToast({
                        title: "请重新登录",
                        icon: "none"
                    });
                    wx.navigateTo({
                        url: "/pages/reg/reg"
                    });
                }else{
                    success(res.data)
                }
            } else {
                fail(res)
            }
            tryHideFullScreenLoading();
        },
        fail: function (res) {
            if (message != "") {
                wx.hideLoading()
            }
            fail(res)
            tryHideFullScreenLoading();
        },
        complete: function () {
            wx.hideNavigationBarLoading();
        }
    })
}

//取消post请求
function abortPostRequest(url, params, success, fail) {
    postRequestTask.abort()
}

//取消get请求
function abortGetRequest(url, params, success, fail) {
    getRequestTask.abort()
}

module.exports = {
    postRequest: postRequest,
    postRequestLoading: postRequestLoading,
    getRequest: getRequest,
    getRequestLoading: getRequestLoading,
    abortPostRequest: abortPostRequest,
    abortGetRequest: abortGetRequest
}


// var network  = require('../../utils/network.js');