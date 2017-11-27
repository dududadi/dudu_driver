//go.js
var amapFile = require('../../libs/AMapWX_SDK_V1.2.1/amap-wx.js');
var config = require('../../libs/config.js');
//获取应用实例
Page({
    /**
     * 页面的初始数据
     */
    data: {
      uid: '',
      showBtn: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options);
      this.data.uid = options.uid;
        var _this = this;
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({key: key});
        myAmapFun.getRegeo({
          iconPath: "../../img/marker_checked.png",
          iconWidth: 22,
          iconHeight: 32,
          success: function(data){
            var marker = [{
              id: data[0].id,
              latitude: 26.068886, //26.070351,
              longitude: 119.29645, //119.29637,
              iconPath: data[0].iconPath,
              width: data[0].width,
              height: data[0].height
            }];
            // _this.setData({
            //   markers: marker
            // });
            _this.setData({
              latitude: data[0].latitude
            });
            _this.setData({
              longitude: data[0].longitude
            })
          },
          fail: function(info){
            // wx.showModal({title:info.errMsg})
          }
        })
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



    //接到乘客按钮
    click: function (e) {
      console.log(e);
      var uid = this.data.uid;
      var node = e.target.id;
      this.data
    },

    //司机接单事件
    receiveOrder: function (e) {
      var dataObj = e.target.id;
      wx.redirectTo({
        url: '/pages/go/go'
      });
    }
})
