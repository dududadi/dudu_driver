//main.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: ''
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
          _this.data.latitude = latitude;
          _this.data.longitude = longitude;
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
    var openID = wx.getStorageSync('openid');
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    wx.redirectTo({
        url: '/pages/receive_order/receive_order?openid='+openID+'&longitude='+longitude+'&latitude='+latitude //进入出车接单界面
    });
  }
})
