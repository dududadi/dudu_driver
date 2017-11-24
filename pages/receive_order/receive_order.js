//receive_order.js
//获取应用实例
Page({
    /**
     * 页面的初始数据
     */
    data: {
      openid: '',
      latitude: '',
      longitude: '',
      orderList:[
        {
          sSite: '起点',
          eSite: '终点',
          distance: 11.20
        },
        {
          sSite: '起点',
          eSite: '终点',
          distance: 9.05
        },
        {
          sSite: '起点',
          eSite: '终点',
          distance: 24.00
        },
        {
          sSite: '起点',
          eSite: '终点',
          distance: 5.29
        },
        {
          sSite: '起点',
          eSite: '终点',
          distance: 6.66
        }
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options);
      this.data.openid = options.openid;
      var _this = this;
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          console.log(res);
          var latitude = res.latitude;
          var longitude = res.longitude;
          _this.data.latitude = latitude;
          _this.data.longitude = longitude;
          _this.getOrdersDes(longitude,latitude);
        },
        fail: function () {
        }
      });
      //this.getOrders();
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

    //获取订单详细信息
    getOrdersDes: function (longitude,latitude) {
      wx.request({
        url: 'https://www.forhyj.cn/miniapp/User/xxx',
        data: {},
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          console.log(res);
        },
        fail: function (err) {
          console.log(err);
        }
      })
    },

    //司机接单事件
    receiveOrder: function (e) {
      var _this = this;
      var dataObj = e.target.dataset;
      wx.redirectTo({
        url: '/pages/go/go?openid=' + _this.data.openid
      });
    },

    //获取订单信息
    getOrders: function () {
      var _this = this;
      wx.request({
        url: 'https://www.forhyj.cn/Driver/xxx',
        data: {openid:_this.data.openid},
        success: function (res) {
          console.log("success");
          console.log(res);
        },
        fail: function (err) {
          console.log(err);
        },
        header: {
          'content-type': 'application/json' // 默认值
        }
      });
    }
})
