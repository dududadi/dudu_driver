//receive_order.js
//获取应用实例
Page({
    /**
     * 页面的初始数据
     */
    data: {
      driv_open_id: '',
      driv_latitude: '',
      driv_longitude: '',
      itv: '',
      orderList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var _this = this;
      this.setData({
        driv_open_id: wx.getStorageSync('openid'), //司机open_id
        driv_longitude: options.driv_longitude,
        driv_latitude: options.driv_latitude
      });

      this.getOrders();
      this.setData({
        itv: setInterval(_this.getOrders, 5000)
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
      this.stopItv();
    },

    /**
     * 页面相关事件处理函数--监听用-户下拉动作
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

    //获取当前司机位置
    getDriverPos: function () {
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
      })
    },

    //司机接单事件
    receiveOrder: function (e) {
      var _this = this;
      this.getDriverPos();
      var data = e.target.dataset;
      var user_openid = data.user; //用户open_id
      var time = data.time; //订单生成时间
      var sName = data.sname; //起点名
      var sLongitude = data.ssitelongitude; //起点经度
      var sLatitude = data.ssitelatitude; //起点纬度
      var eName = data.ename; //终点名
      var eLongitude = data.esitelongitude; //终点经度
      var eLatitude = data.esitelatitude; //终点纬度
      var timeInterval = parseInt(((new Date().getTime())/1000) - ((new Date(time).getTime())/1000));
      //console.log(timeInterval);
      wx.showLoading({
        title: '加载中...',
      });
      wx.request({
        url: 'https://www.forhyj.cn/miniapp/Driver/receiveOrder',
        method: 'POST',
        data: {
          openid: user_openid,
          driverOpenId: _this.data.driv_open_id,
          longitude: _this.data.driv_longitude,
          latitude: _this.data.driv_latitude
        },
        success: function (res) {
          console.log(res);
          res = res.data;
          if (res === 0) {
            wx.hideLoading();
            wx.showLoading({
              title: '该单已过期',
            });
            setTimeout(wx.hideLoading, 1000);
          } else {
            _this.stopItv();
            wx.redirectTo({
              url: '/pages/go/go?user_openid=' + user_openid + '&sSite=' + sLongitude + ',' + sLatitude + '&eSite=' + eLongitude + ',' + eLatitude + '&driv_longitude=' + _this.data.driv_longitude + '&driv_latitude=' + _this.data.driv_latitude + '&sLongitude=' + sLongitude + '&sLatitude=' + sLatitude + '&eLongitude=' + eLongitude + '&eLatitude=' + eLatitude + '&sName=' + sName + '&eName=' + eName, //进入接单页面
              success: function () {
                wx.hideLoading();
              }
            });
          }
        },
        fail: function (err) {
          console.log(err);
          _this.stopItv();
        }
      })

    },


    //获取订单信息
    getOrders: function () {
      var _this = this;
      this.getDriverPos();
      wx.request({
        url: 'https://www.forhyj.cn/miniapp/Driver/getOrderList',
        method: 'POST',
        data: {
          openid: _this.data.driv_open_id,
          longitude: _this.data.driv_longitude,
          latitude: _this.data.driv_latitude
        },
        success: function (res) {
          var data = res.data;
          for (var i = 0; i < data.length; i++) {
            data[i].oh_km_num = Math.round(data[i].oh_km_num/10)/100;
          };
          console.log(data);
           _this.setData({
              orderList: data
           });
          console.log(_this.data.driv_longitude,_this.data.driv_latitude);
        },
        fail: function (err) {
          console.log(err);
        },
        header: {
          'content-type': 'application/json' // 默认值
        }
      });
    },

    stopItv: function () {
      this.setData({
        itv: clearInterval(this.data.itv)
      });
    }

})
