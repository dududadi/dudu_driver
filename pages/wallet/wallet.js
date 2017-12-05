Page({

  /**
   * 页面的初始数据
   */
  data: {
    monney:0,
    money: ""
  },
  
  payment:function()
  {
    //获取当前登录的openid
    var openid = wx.getStorageSync('openid')
    //console.log(openid);
    //获取当前时间戳
    //var timestamp = Date.parse(new Date());
   // timestamp = timestamp / 1000;
    //console.log("当前时间戳为：" + timestamp);
    /*wx.request({
      url: 'https://www.forhyj.cn/miniapp/WexinPay/Pay',
      method: 'GET',
      data: {
        openid:openid,
        total_fee:1
      },
      success: function (res) {
        console.log(res);
      },
      fail:function(res){
        console.res; 
      }
    })*/
  },
  myBill: function () {
    wx.navigateTo({
      url: '../bill/bill'
    })
  },
  inputMoney: function (e) {
    this.setData({
      money: e.detail.value
    })
  },
  payment: function (e) {
    this.setData({
      wallets_password_flag: true,
    })
  },
  conPay: function () {
    var openid = wx.getStorageSync('openid')
    var money = this.data.money;
    console.log(money)
    console.log(openid)
    wx.request({
      url: "https://www.forhyj.cn/miniapp/Wallet/enchashment",
      data: {
        money: money,
        openid: openid
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        if(res=1)
        {
          wx.showModal({
            title: '提示',
            content: '金额不足',
          })
        }else{
          wx.showToast({
            title: '支付成功',
          })
        }
        
      }
    })
  },
  close_wallets_password() {//关闭钱包输入密码遮罩
    this.setData({
      isFocus: false,//失去焦点
      wallets_password_flag: false,
    })
  },
  close_fast_charge() {//关闭快速充值遮罩
    this.setData({
      isFocus: false,//失去焦点
      fast_charge_flag: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var openid = wx.getStorageSync('openid');
    //console.log(openid)
    wx.request({
      url: 'https://www.forhyj.cn/miniapp/Wallet/driverWallet',
      method: 'POST',
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          monney: res.data.driv_money
        })
      },
      fail:function(res){
        console.log(1);
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    
  }
})