Page({
  data: {
    toView: 'red',
    scrollTop: 0,
    commentShow: 'none',
    commentTime: '',
    commentScore: '',
    commentText: ''
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
  //查看评分信息
  checkComment: function (e) {
    var that = this;
    var orderId = e.target.id;
    var that = this;
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/driver/getOrderComment',
      method: 'POST',
      data: {orderId: orderId},
      success: function (res) {
        console.log(res.data);
        that.setData({
          commentTime: res.data.cdtu_time,
          commentScore: res.data.cdtu_score,
          commentText: res.data.cdtu_content,
          commentShow: 'block'
        });
      }
    });
  },
  //关闭评分信息
  closeComment: function (e) {
    this.setData({
      commentShow: 'none'
    });
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