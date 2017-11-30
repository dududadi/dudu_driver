//go.js
var amapFile = require('../../libs/AMapWX_SDK_V1.2.1/amap-wx.js');
var config = require('../../libs/config.js');
var myAmapFun = new amapFile.AMapWX({key: config.Config.key});
var step = 2; //位置信息获取步骤
var changeItv = false;
var launch_status = false;
var pointArr = []; //记录司机走过的点
var sec = 0; //用于记录
//获取应用实例
Page({
  /**
   * 页面的初始数据
   */
  data: {
    style_show: 'block',
    style_top: '60px',
    guideInfoHeight: '30px',
    btnTip: '确认已接到乘客',
    user_openid: '',
    driv_open_id: wx.getStorageSync('openid'),
    orderId: '',
    sSite: '', //起点经纬度
    sName: '', //起点名
    sLongitude: '', //起点经度
    sLatitude: '', //起点纬度
    eSite: '', //终点经纬度
    eName: '', //终点名
    eLongitude: '', //终点经度
    eLatitude: '', //终点纬度
    polyline: [], //路径规划点
    driv_longitude: '',
    driv_latitude: '',
    driv_location: '',
    user_longitude: '',
    user_latitude: '',
    user_location: '',
    textData: '道路导航信息', //道路导航信息
    itv: '', //计时器
    markers: [], //用户或目的地标记
    behavior: 'go_receive', //当前驾驶行为
    second: 2000,
    confirmBtnStyle: 'receive-now',
    size: '36',
    dpr: '',
    wordsContentW: '',
    wordsCount: '',
    margin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*console.log(options);*/
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

    wx.getSystemInfo({
      success: function(res) {
        var screenW = res.windowWidth; //窗口可使用宽度
        var dpr = res.pixelRatio; //设备像素比
        var wordsCount = parseInt(screenW*dpr/_this.data.size);
        var wordsContentW = wordsCount*_this.data.size/dpr;
        var remain = (screenW - wordsContentW)/2;
        //console.log(wordsCount,wordsContentW);
        _this.setData({
          wordsContentW: wordsContentW,
          dpr: dpr,
          wordsCount: wordsCount,
          margin: remain + 'px'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    this.getAllLocation();
    this.setData({
      itv: setInterval(_this.getAllLocation,_this.data.second)
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
    step = 1;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        /*console.log(res);*/
        _this.setData({
            driv_latitude: res.latitude,
            driv_longitude: res.longitude,
            driv_location: res.longitude + ',' + res.latitude,
         });
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
        /*console.log(res.data);
        console.log(step);*/
        if (step === 1 && res.data) {
          step = 2;
          console.log('得到用户位置');
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
            ]
          });
          _this.drawMap();
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
    this.getUserLocation();
  },

  //接到乘客按钮//乘客到站按钮
  received: function (e) {
    var _this = this;
    this.stopItv();
    if (!launch_status) {
      wx.request({
        url: 'https://www.forhyj.cn/miniapp/Driver/received',
        method: 'POST',
        data: {
          openid: _this.data.driv_open_id
        },
        success: function (res) {
          if (res.data) {
            _this.setData({
              orderId: res.data,
              behavior: 'go_destination',
              guideInfoHeight: '60px',
              style_show: 'none',
              btnTip: '确认乘客到达终点',
              confirmBtnStyle: 'arrive-now'
            });
            _this.setData({
              itv: setInterval(_this.launch,1000)
            });
            launch_status = true;
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
    } else {
      wx.showLoading({
      title: '等待订单结算中',
    });
      wx.request({
        url: 'https://www.forhyj.cn/miniapp/Driver/arrive',
        method: 'POST',
        data: {
          openid: _this.data.orderId
        },
        success: function (res) {
          if (res.data) {
            wx.hideLoading();
            wx.showToast({
              title: '结算成功',
              icon: 'success',
              duration: 1000
            });
          } else {
            wx.hideLoading();
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
        }
      });
    };

  },

  //司机取消订单
  cancelOrder: function (e) {
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    this.stopItv();
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Driver/cancelOrder',
      data: {openid: this.data.user_openid},
      method: 'POST',
      success: function (res) {
        /*console.log(res.data);*/
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
                _this.stopItv();
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
    /*console.log(_this.data.driv_location, _this.data.user_location);
    console.log(step);*/
    if (step === 2) {
      console.log('开始绘图');
      step = 0;
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
          var words = data.paths[0].steps[0].instruction;
          if (words.length > _this.data.wordsCount ) {
            _this.setData({
              style_show: 'none',
              guideInfoHeight: '60px'
            });
          } else {
            _this.setData({
              style_show: 'block',
              guideInfoHeight: '30px'
            });
          }
          _this.setData({
            polyline: [{
              points: points,
              color: "#0091ff",
              width: 6
            }],
            textData: words
          });
        }
      })
    }
  },


  launch: function () {
    var _this = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        /*console.log(res);*/
        sec++;
        pointArr.push({
          longitude: res.longitude,
          latitude: res.latitude
        });
        if (sec%5 === 0) {
          //每5秒发送一次
          console.log('发送位置中...');
          _this.pushPoint(res.longitude,res.latitude);
        }
        _this.setData({
          polyline: [{
            points: pointArr,
            color: "#25A5F7",
            width: 6
          }]
        });

        //获取司机位置到终点的导航信息
        myAmapFun.getDrivingRoute({
          origin: _this.data.driv_location,
          destination: _this.data.eSite,
          success: function (data) {
            //console.log(data);
            var points = [];
            //console.log(data.paths[0].steps);
            var words = data.paths[0].steps[0].instruction;
            if (words.length > _this.data.wordsCount ) {
              _this.setData({
                guideInfoHeight: '60px'
              });
            } else {
              _this.setData({
                guideInfoHeight: '30px'
              });
            }
            _this.setData({
              textData: words
            });
          }
        });
      },
      fail: function (err) {
        console.log(err);
      }
    })

  },

  //向服务器发送当前坐标
  pushPoint: function (longitude,latitude) {
    var _this = this;
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Driver/pushPoint',
      data: {
        longitude: longitude,
        latitude: latitude,
        orderId: _this.data.orderId
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },

  startItv: function (e) {
    var _this = this;
    this.setData({
      itv: setInterval(_this.getAllLocation,_this.data.second)
    });
  },

  stopItv: function (e) {
    var _this = this;
    this.setData({
      itv: clearInterval(_this.data.itv)
    });
  },

  changeItv: function (e) {
    //console.log(changeItv);
      if (!changeItv) {
        this.stopItv();
        changeItv = true;
      } else {
        this.startItv();
        changeItv = false;
      }
  }

})
