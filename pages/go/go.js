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
    style_show: 'block',
    style_top: '60px',
    user_openid: '',
    driv_open_id: wx.getStorageSync('openid'),
    sSite: '', //起点经纬度
    sName: '', //起点名
    sLongitude: '', //起点经度
    sLatitude: '', //起点纬度
    eSite: '', //终点经纬度
    eName: '', //终点名
    eLongitude: '', //终点经度
    eLatitude: '', //终点纬度
    polyline: [], //路径规划点
    driv_longitude: '119.272119',
    driv_latitude: '26.035941',
    driv_location: '119.272119,26.035941',
    user_longitude: '119.390565',
    user_latitude: '25.985416',
    user_location: '119.390565,25.985416',
    textData: {}, //道路导航信息
    itv: '', //计时器
    markers: [], //用户或目的地标记
    step: 2, //位置信息获取步骤
    behavior: 'go_receive' //当前驾驶行为
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
      sName: options.sName,
      sLongitude: options.sLongitude,
      sLatitude: options.sLatitude,
      eSite: options.eSite,
      eName: options.eName,
      eLongitude: options.eLongitude,
      eLatitude: options.eLatitude,
      driv_longitude: options.driv_longitude,
      driv_latitude: options.driv_latitude,
      driv_location: options.driv_longitude + ',' + options.driv_latitude,
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
      itv: setInterval(_this.getAllLocation,2000)
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
  getDriverLocation: function () {
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        _this.setData({
            driv_latitude: res.latitude,
            driv_longitude: res.longitude,
            driv_location: res.longitude + ',' + res.latitude,
            step: 1
         });

        _this.getUserLocation();
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
        openid: _this.data.driv_open_id
      },
      success: function (res) {
        console.log(res.data);
        console.log(_this.data.step);
        if (_this.data.step === 1 && res.data) {
          _this.setData({
            user_longitude: res.data.ul_longitude,
            user_latitude: res.data.ul_latitude,
            user_location: res.data.ul_longitude + ',' + res.data.ul_latitude,
            markers: [
              {
                iconPath: "../../imgs/marker_checked.png",
                id: 1,
                latitude: res.data.ul_latitude,
                longitude: res.data.ul_longitude,
                width: 23,
                height: 33
              }
            ],
            step: 2
          });
          _this.drawMap();
        } else {
          wx.showModal({
            title: '提示',
            content: '未获取到乘客位置',
            showCancel: false,
            success: function(res) {

            }
          });
        }
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },

  //获取双方位置
  getAllLocation: function (e) {
    var _this = this;
    this.getDriverLocation();
  },

  //接到乘客按钮
  received: function (e) {
    var _this = this;
    this.stopItv();
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Driver/received',
      method: 'POST',
      data: {
        openid: _this.data.driv_open_id
      },
      success: function (res) {
        if (res.data) {
          _this.setData({
            behavior: 'go_destination',
            style_top: '30px',
            style_show: 'none'
          });

        } else {
          wx.showModal({
            title: '提示',
            content: '操作出错，请联系客服！',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/receive_order/receive_order'
                });
              }
            }
          });
        }
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
    if (this.data.step === 2) {
      _this.setData({
        step: 0
      });

      myAmapFun.getDrivingRoute({
        origin: _this.data.driv_location,
        destination: _this.data.user_location,
        success: function (data) {

          //console.log(data);
          var points = [];

          if (data.paths && data.paths[0] && data.paths[0].steps) {
            var steps = data.paths[0].steps;
            for (var i = 0; i < steps.length; i++) {
              var poLen = steps[i].polyline.split(';');
              for (var j = 0; j < poLen.length; j++) {
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
    }
  },

  startItv: function (e) {
    var _this = this;
    console.log('start');
    this.setData({
      itv: setInterval(_this.getAllLocation,2000)
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
