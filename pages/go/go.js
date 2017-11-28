//go.js
var amapFile = require('../../libs/AMapWX_SDK_V1.2.1/amap-wx.js');
var config = require('../../libs/config.js');
var myAmapFun = new amapFile.AMapWX({key: config.Config.key});

//获取应用实例
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_openid: '',
    driv_open_id: wx.getStorageSync('openid'),
    sSite: '',
    sLongitude: '',
    sLatitude: '',
    eLongitude: '',
    eLatitude: '',
    polyline: [],
    driv_longitude: '119.272119',
    driv_latitude: '26.035941',
    driv_location: '119.272119,26.035941',
    user_longitude: '119.390565',
    user_latitude: '25.985416',
    user_location: '119.390565,25.985416',
    textData: {},
    itv: '',
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var _this = this;
    this.setData({
      user_openid: options.user_openid,
      sSite: options.sSite,
      sLongitude: options.sLongitude,
      sLatitude: options.sLatitude,
      eLongitude: options.eLongitude,
      eLatitude: options.eLatitude,
      // driv_longitude: options.driv_longitude,
      // driv_latitude: options.driv_latitude,
      // driv_location: options.driv_longitude + ',' + options.driv_latitude,
      itv: '',//setInterval(this.paintMap, 2000)
      markers: [
        {
          iconPath: "../../imgs/marker_checked.png",
          id: 1,
          latitude: this.data.user_latitude,
          longitude: this.data.user_longitude,
          width: 23,
          height: 33
        }
      ]
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
    this.drawMap();
    this.setData({
      itv: setInterval(_this.getDriverPos,2000)
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

  //获取当前司机位置
  getDriverPos: function () {
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        _this.setData({
            driv_latitude: res.latitude,
            driv_longitude: res.longitude,
            driv_location: res.longitude + ',' + res.latitude
         });
        _this.drawMap();
      },
      fail: function () {

      }
    })
  },

  //获取乘客位置
  getUserLocation: function (e) {
    var _this = this;
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Driver/getUserLocation',
      method: 'POST',
      data: {
        openid: _this.data.driver_open_id
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    });
  },

  //接到乘客按钮
  received: function (e) {
    var _this = this;
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Driver/received',
      method: 'POST',
      data: {
        openid: _this.data.driver_open_id
      },
      success: function (res) {
        console.log(res);
        _this.getUserLocation();
      },
      fail: function (err) {
        console.log(err);
      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    });
  },

  //司机取消订单
  cancelOrder: function (e) {
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Driver/cancelOrder',
      data: {openid: this.data.user_openid},
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        if (res.data === 1) {
          wx.hideLoading();
          wx.showToast({
            title: '取消成功！',
            icon: 'success',
            duration: 1000
          })
          wx.redirectTo({
            url: '/pages/receive_order/receive_order'
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '取消出错，请联系客服！',
            success: function(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/receive_order/receive_order'
                });
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '/pages/receive_order/receive_order'
                });
              }
            }
          });
        };
      },
      fail: function (err) {
        console.log(err);
        wx.hideLoading();
      }
    })
  },

  //绘制地图
  drawMap: function (e) {
    var _this = this;
    console.log(_this.data.driv_location, _this.data.user_location);
    myAmapFun.getDrivingRoute({
      origin: _this.data.driv_location,
      destination: _this.data.user_location,
      success: function(data){
        //console.log(data);
        var points = [];

        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        _this.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
      }
    })
  },

  startItv: function (e) {
    var _this = this;
    console.log('start');
    this.setData({
      itv: setInterval(_this.getDriverPos,2000)
    });
  },

  stopItv: function (e) {
    var _this = this;
    console.log('end');
    this.setData({
      itv: clearInterval(_this.data.itv)
    });
  }
})
