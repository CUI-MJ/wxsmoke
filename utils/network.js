/**
 * url:请求的url
 * params:请求参数
 * message:loading提示信息
 * success:成功的回调
 * fail:失败的回调
 */
//https://membert.chinajinmao.cn/cig/
const host = 'http://192.168.1.4:8081/'
// const host ="http://mytrain2.shsmiles.com"
//post请求

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
        },
        fail: function (res) {
            if (message != "") {
                wx.hideLoading()
            }
            fail(res)
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
        },
        fail: function (res) {
            if (message != "") {
                wx.hideLoading()
            }
            fail(res)
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