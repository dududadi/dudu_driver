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
  bindViewTap: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  onLoad: function () {
    this.getUserInfo; 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
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
              var data = res.data;
              console.log(data);
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
                console.log('something fail');
                
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
