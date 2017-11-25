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
      this.data.openid = options.openid;
      var _this = this;
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          //console.log(res);
          var latitude = res.latitude;
          var longitude = res.longitude;
          _this.data.latitude = latitude;
          _this.data.longitude = longitude;
          //_this.getOrdersDes(longitude,latitude);
        },
        fail: function () {
        }
      });
      this.getOrders();
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
        url: '/pages/go/go?openid=' + _this.data.openid //进入接单页面
      });
    },

    //获取订单信息
    getOrders: function () {
      var _this = this;
      wx.request({
        url: 'https://www.forhyj.cn/miniapp/Driver/getOrderList',
        method: 'POST',
        data: {openid:_this.data.openid},
        success: function (res) {
          var data = res.data;
          _this.setData({
            orderList: data
          });
          console.log(_this.data.orderList);
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
