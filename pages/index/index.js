//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用 嘟嘟出行',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that = this;

    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.getUserInfo({
        success: function (res) {
          app.globalData.userInfo = res.userInfo;
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.forhyj.cn/miniapp/Driver/getOpenId',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res);
              var data = res.data;

              wx.setStorageSync('loginSessionKey', data.session_key);
              wx.setStorageSync('openid', data.open_id);

              if (data.status == 'success') {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../main/main',
                  })
                }, 1000);
              } else if (data.status == 'fail') {
                wx.showModal({
                  title: '您尚未注册',
                  content: '是否需要前往注册页面',
                  success: function (res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../register/register',
                      })
                    } else {
                      wx.navigateBack({

                      })
                    }
                  }
                })
              } else {
                console.log('something fail')
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
