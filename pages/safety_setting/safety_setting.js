const app = getApp();
Page({
    data: {
      tel:'',
      psw:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var _this = this;

    },

    //修改
    confirm: function () {
      if (this.data.tel === '') {
        wx.showModal({
          title: '请检查输入',
          content: '手机号不能为空！'
        })
      } else if (this.data.psw === '') {
        wx.showModal({
          title: '密码输入有误',
          content: '密码不能为空！'
        })
      } else {

        var data = {
          tel: this.data.tel,
          psw: this.data.psw
        }
        //console.log(data);
        wx.request({
          url: "https://www.forhyj.cn/miniapp/Driver/editInfo",
          method: "POST",
          data: data,
          success: function (res) {
            var data = res.data;
            if (data == 0) {
              wx.showModal({
                title: '信息有误',
                content: '手机号码格式不对，请重新再试'
              })
            } else if (data == 1) {
              wx.showModal({
                title: '信息有误',
                content: '手机号码已注册，请更换'
              })
            } else if (data == 2) {
              wx.showModal({
                title: '信息有误',
                content: '密码请输入6至16位英文+数字，请重新输入'
              })
            } else if (data == 10) {
              wx.showModal({
                title: '修改成功',
                content: '已为您绑定新的手机号',
                success: function () {
                  wx.redirectTo({
                    url: '/pages/main/main'
                  });
                }
              })
            } else if (data == 11) {
              wx.showModal({
                title: '未知错误',
                content: '请联系管理员'
              })
            }
          }
        })
      }
    },

    bindTel: function (e) {
      this.setData({
        tel: e.detail.value
      })
    },
    bindPsw: function (e) {
      this.setData({
        psw: e.detail.value
      })
    }
})
