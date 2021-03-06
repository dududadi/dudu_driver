//main.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    driv_latitude: '',
    driv_longitude: '',
    status: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          //console.log(res);
          var latitude = res.latitude;
          var longitude = res.longitude;
          _this.setData({
            driv_latitude: latitude,
            driv_longitude: longitude
          });
        },
        fail: function () {

        }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        //console.log(res.screenWidth);
        //console.log(res.screenHeight);
        //console.log(res.windowWidth);
        //console.log(res.windowHeight);
        var avgW = (res.windowWidth-2)/3;
        _this.setData({
          "itemW": avgW + 'px',
          "itemW_2": avgW*2 + 'px',
          "itemH": avgW+ 15 + 'px'
        });
      }
    });
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Driver/verify',
          method: 'POST',
          data:{openId:wx.getStorageSync('openid')},
          success: function (res) {
            //console.log(res.data);
            if (res.data === 1) {
              //审核已通过
              _this.setData({
                status: true
              });
            }
          },
          fail: function (err) {
            console.log(err);
          }
    });
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

  //出车
  doReceive: function () {
    var driv_open_id = wx.getStorageSync('openid');
    var latitude = this.data.driv_latitude;
    var longitude = this.data.driv_longitude;
    // wx.request({
    //   url: 'https://www.forhyj.cn/miniapp/Driver/getOnlineOrder',
    //   method: 'POST',
    //   data: {openId: wx.getStorageSync('openid')},
    //   success: function (res) {
    //     console.log(res.data);
    //   },
    //   fail: function (err) {
    //     console.log(err);
    //   }
    // });

    if (this.data.status) {
      wx.navigateTo({
          url: '/pages/receive_order/receive_order?driv_longitude='+longitude+'&driv_latitude='+latitude //进入出车接单界面
      });
    } else {
      wx.showModal({
        title: '错误',
        content: '您的司机认证未审核！请先通过审核',
        success: function(res) {
          if (res.confirm) {

          } else if (res.cancel) {

          }
        }
      })
    }
  },

  //我的钱包按钮
  myWallet: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../wallet/wallet'
    })
  },

  //历史订单按钮
  myOrder: function (e) {
    wx.navigateTo({
      url: '../order/order?openid=' + wx.getStorageSync('openid')
    })
  },
  //建议
  suggest: function (e) {
      console.log(e);
      wx.navigateTo({
          url: '../suggest/suggest'
      })
  },
  //指南按钮
  guide: function (e) {
    wx.navigateTo({
      url: '../guide/guide'
    })
  },

  //安全设置
  safetySetting: function (e) {
    wx.navigateTo({
      url: '../safety_setting/safety_setting?openid=' + wx.getStorageSync('openid')
    })
  }
})
