var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
var qqMap = new QQMapWX({
  key: 'ZNWBZ-QJMCR-BLOWX-WAK34-EFEEF-B6FCT'
});
const app = getApp();
Page({
    data: {
      region:[
      '福建省',
      '福州市',
      '仓山区',
      ],
      tel:'',
      psw:'',
      cPsw:'',
      driverName:'',
      idNum:'',
      getDate:'',
      carNum:'',
      carType:'',
      carOwner:'',
      regDate:'',
      address:'',
      btNameIndex:0,//默认选中第几项
      btNameArray:'',
      btName:'出租车'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      var userInfo = app.globalData.userInfo;

      //console.log(userInfo)

      var _this = this;
      wx.request({
        url: "https://www.forhyj.cn/miniapp/Driver/getBtName",
        method: "POST",
        data: '',
        success: function (res) {
          //console.log(res);
          _this.setData({ 
            btNameArray:res.data
          });
        }
      });

      wx.getLocation({
        success: function (res) {
          qqMap.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (res) {
              var component = res.result.address_component;

              _this.setData({
                region: [
                component.province,
                component.city,
                component.district
                ]
              })
            }
          })
        }
      })
    },
    //注册
    driverReg: function () {
      if (this.data.tel == '' || this.data.psw == '' || this.data.cPsw == '' || this.data.driverName == '' || this.data.idNum == '' || this.data.getDate == '' || this.data.carNum == '' || this.data.carType == '' || this.data.carOwner == '' || this.data.regDate == '') {
        wx.showModal({
          title: '请检查输入',
          content: '部分输入有误，请重新再试'
        })
      } else if (this.data.psw != this.data.cPsw) {
        wx.showModal({
          title: '密码输入有误',
          content: '两次密码输入不一致，请重新再试'
        })
      } else {
        var userInfo = app.globalData.userInfo;

        var data = {
          province: this.data.region[0],
          city: this.data.region[1],
          area: this.data.region[2],
          tel: this.data.tel,
          psw: this.data.psw,
          cPsw: this.data.cPsw,
          driverName: this.data.driverName,
          idNum: this.data.idNum,
          getDate: this.data.getDate,
          carNum: this.data.carNum,
          carType: this.data.carType,
          carOwner: this.data.carOwner,
          regDate: this.data.regDate,
          openid: wx.getStorageSync('openid'),
          headImg: userInfo.avatarUrl,
          address: this.data.address,
          btName: this.data.btName
        }
        //console.log(data);
        wx.request({
          url: "https://www.forhyj.cn/miniapp/Driver/register",
          method: "POST",
          data: data,
          success: function (res) {
            var data = res.data;

            if (data == 0) {
              wx.showModal({
                title: '基本信息有误',
                content: '手机号码格式不对，请重新再试'
              })
            } else if (data == 1) {
              wx.showModal({
                title: '基本信息有误',
                content: '手机号码已注册，请更换'
              })
            } else if (data == 2) {
              wx.showModal({
                title: '基本信息有误',
                content: '请输入6至16位英文或数字，请重新输入'
              })
            } else if (data == 3) {
              wx.showModal({
                title: '基本信息有误',
                content: '两次输入密码不一致，请重新输入'
              })
            } else if (data == 4) {
              wx.showModal({
                title: '驾驶证信息有误',
                content: '请输入正确人名',
                success: function (res) {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            } else if (data == 5) {
              wx.showModal({
                title: '驾驶证信息有误',
                content: '身份证格式有误，请重新输入',
                success: function (res) {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            } else if (data == 6) {
              wx.showModal({
                title: '驾驶证信息有误',
                content: '您的驾龄不足3年，不满足注册条件',
                success: function (res) {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            } else if (data == 7) {
              wx.showModal({
                title: '行驶证信息有误',
                content: '您的车牌号不满足格式，请输入正确车牌号',
                success: function (res) {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            } else if (data == 8) {
              wx.showModal({
                title: '行驶证信息有误',
                content: '车辆拥有人姓名，请输入正确人名',
                success: function (res) {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            } 
            else if (data == 9) {
              wx.showModal({
                title: '行驶证信息有误',
                content: '您的车辆行驶超过8年，请更换车辆',
                success: function (res) {
                  wx.redirectTo({
                    url: '../index/index',
                  })
                }
              })
            }else if (res == 10) {
              wx.showModal({
                title: '注册成功',
                content: '欢迎加入嘟嘟王国'
              })
            }
            else if (res == 11) {
              wx.showModal({
                title: '未知错误',
                content: '请联系管理员'
              })
            }
          }
        })
      }
    },
    bindBtNameChange:function(e){
      var _this = this;
      console.log('picker发送选择改变bindBtNameChange，携带值为', e.detail.value);
      this.setData({ 
        btNameIndex: e.detail.value,
        btName: _this.data.btNameArray[e.detail.value]
      });
      console.log(this.data.btNameIndex);
      console.log(this.data.btName);
    },
    bindAddress: function (e) {
      this.setData({
        address: e.detail.value
      })
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
    },
    bindCPsw: function (e) {
      this.setData({
        cPsw: e.detail.value
      })
    },
    bindDriverName: function (e) { 
      this.setData({
        driverName: e.detail.value
      })
    },
    bindIdNum: function (e) {
      this.setData({
        idNum: e.detail.value
      })
    },
    bindCarNum: function (e) { 
      this.setData({
        carNum: e.detail.value
      })
    },
    bindCarType: function (e) { 
      this.setData({
        carType: e.detail.value
      })
    },
    bindCarOwner: function (e) { 
      this.setData({
        carOwner: e.detail.value
      })
    },
    getCurrentDate: function () {
      var now = new Date();
      var year = now.getFullYear();       //年
      var month = now.getMonth() + 1;     //月
      var day = now.getDate();            //日
      var currentDate = year + '-' + month + '-' + day;
      this.setData({
        currentDate: currentDate
      })
    },
    bindGetDateChange: function (e) {
      console.log('picker发送选择改变，初次领取驾照日期', e.detail.value)
      this.setData({
        getDate: e.detail.value
      })
    },
    bindRegDateChange: function (e) {
      console.log('picker发送选择改变，车辆注册日期', e.detail.value)
      this.setData({
        regDate: e.detail.value
      })
    }
    
})
