Page({
  data: {
    toView: 'red',
    scrollTop: 0
  },
  checkMap: function () {
      wx.redirectTo({
          url: '../map/map'
      })
  },
  goPay: function () {
      wx.redirectTo({
          url: '../pay/pay'
      })
  },
  checkComment:function(e){
      wx.redirectTo({
          url: '../comment_view/comment_view'
      })
  },
  goComment: function (event) {
      var orderId = event.target.id;
      console.log(event);
      console.log(orderId);
      wx.redirectTo({
          url: '../comment/comment?orderId='+orderId
      })
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onLoad:function (location) {
    var wxopid=location.openid;
    var that=this;
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/order/dirvOrderList',
      method:'POST',
      data: { 'wxopid': wxopid},
      success:function(res){
        that.setData({
          resArr: res.data
        })
      }
    })
  }
})