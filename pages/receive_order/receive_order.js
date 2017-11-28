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
      orderList:[
        {
          open_id: 'o7r8T0XJAc4FSyQjVK_VJ-FhGppY', //乘客open_id
          oh_create_time: '2017-11-25 10:09:18', //下单时间
          oh_start_name: '起点', //乘车起点
          oh_start_longitude: "119.261", //起点经度
          oh_start_latitude: "26.0778", //起点纬度
          oh_end_name: '终点', //乘车终点
          oh_end_longitude: "119.231", //终点经度
          oh_end_latitude: "26.0773", //终点纬度
          distance: 11.20 //两地路程距离
        },
        {
          open_id: 2,
          oh_start_name: '起点',
          oh_end_name: '终点',
          distance: 9.05
        },
        {
          open_id: 3,
          oh_start_name: '起点',
          oh_end_name: '终点',
          distance: 24.00
        },
        {
          open_id: 4,
          oh_start_name: '起点',
          oh_end_name: '终点',
          distance: 5.29
        },
        {
          open_id: 5,
          oh_start_name: '起点',
          oh_end_name: '终点',
          distance: 6.66
        }
      ],
      array: [
        {
          message: 'foo',
        },
        {
          message: 'bar'
        }
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var _this = this;
      this.setData({
        driv_open_id: options.driv_openid, //司机open_id
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
      var sLongitude = data.ssitelongitude; //起点经度
      var sLatitude = data.ssitelatitude; //起点纬度
      var eLongitude = data.esitelongitude; //终点经度
      var eLatitude = data.esitelatitude; //终点纬度
      var timeInterval = parseInt(((new Date().getTime())/1000) - ((new Date(time).getTime())/1000));
      console.log(timeInterval);
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
          console.log('请求发送成功');
          console.log(res);
          res = res.data.trim();
          debugger;
          if (res == 0) {
            wx.hideLoading();
            wx.showLoading({
              title: '该单已过期',
            });
            setTimeout(wx.hideLoading(), 1000);
          } else {
            wx.redirectTo({
              url: '/pages/go/go?user_openid=' + user_openid + '&sSite=' + sLongitude + ',' + sLatitude + '&eSite=' + eLongitude + ',' + eLatitude + '&driv_longitude=' + _this.data.driv_longitude + '&driv_latitude=' + _this.data.driv_latitude, //进入接单页面
              success: function () {
                _this.setData({
                  itv: clearInterval(_this.data.itv)
                });
                wx.hideLoading();
              }
            });
          }
        },
        fail: function (err) {
          console.log('请求发送成功');
          console.log(err);
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
           _this.setData({
              orderList: data
           });
          console.log(_this.data.orderList);
          console.log(_this.data.driv_longitude,_this.data.driv_latitude);
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
