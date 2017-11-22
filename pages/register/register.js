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
      regDate:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

      var userInfo = app.globalData.userInfo;

      console.log(userInfo)

      var _this = this;

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
    // register: function () {
    //   if (this.data.tel == '' || this.data.psw == '' || this.data.cPsw == '' || this.data.driverName == '' || this.data.idNum == '' || this.data.getDate == '' || this.data.carNum == '' || this.data.carType == '' || this.data.carOwner == '' || this.data.regDate == '') {
    //     wx.showModal({
    //       title: '请检查输入',
    //       content: '部分输入有误，请重新再试'
    //     })
    //   } else if (this.data.psw != this.data.cPsw) {
    //     wx.showModal({
    //       title: '密码输入有误',
    //       content: '两次密码输入不一致，请重新再试'
    //     })
    //   } else {
    //     var userInfo = app.globalData.userInfo;

    //     var data = {
    //       province:this.region[0],
    //       city: this.region[1],
    //       area: this.region[2],
    //       tel: this.data.tel,
    //       psw: this.data.psw,
    //       cPsw: this.data.cPsw,
    //       driverName: this.data.driverName,
    //       idNum: this.data.idNum,
    //       getDate: this.data.getDate,
    //       carNum: this.data.carNum,
    //       carType: this.data.carType,
    //       carOwner: this.data.carOwner,
    //       regDate: this.data.regDate,
    //       openid: wx.getStorageSync('openid'),
    //       headImg: userInfo.avatarUrl,
    //       nickname: userInfo.nickName
    //     }

    //     wx.request({
    //       url: "https://www.forhyj.cn/miniapp/Driver/register",
    //       method: "POST",
    //       data: data,
    //       success: function (res) {
    //         var data = res.data;

    //         if (data == 0) {
    //           wx.showModal({
    //             title: '电话号码有误',
    //             content: '电话号码格式不对，请重新再试'
    //           })
    //         } else if (data == 1) {
    //           wx.showModal({
    //             title: '密码有误',
    //             content: '密码格式不对，请重新再试'
    //           })
    //         } else if (data == 2) {
    //           wx.showModal({
    //             title: '身份证有误',
    //             content: '身份证号码格式不对，请重新再试'
    //           })
    //         } else if (data == 3) {
    //           wx.showModal({
    //             title: '该手机号已注册',
    //             content: '请更换手机号后再试'
    //           })
    //         } else if (data == 4) {
    //           wx.showModal({
    //             title: '注册成功',
    //             content: '恭喜您注册成功',
    //             success: function (res) {
    //               wx.redirectTo({
    //                 url: '../index/index',
    //               })
    //             }
    //           })
    //         } else if (res == 5) {
    //           wx.showModal({
    //             title: '未知错误',
    //             content: '请联系管理员'
    //           })
    //         }
    //       }
    //     })
    //   }
    // },

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
    driverReg:function(){
      console.log(this.data);
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
    },
    






    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
                        data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                        break;
                    case 1:
                        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                        data.multiArray[2] = ['鲫鱼', '带鱼'];
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                break;
            case 1:
                switch (data.multiIndex[0]) {
                    case 0:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                                break;
                            case 1:
                                data.multiArray[2] = ['蛔虫'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                                break;
                            case 3:
                                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                                break;
                            case 4:
                                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                                break;
                        }
                        break;
                    case 1:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['鲫鱼', '带鱼'];
                                break;
                            case 1:
                                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                                break;
                            case 2:
                                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                                break;
                        }
                        break;
                }
                data.multiIndex[2] = 0;
                console.log(data.multiIndex);
                break;
        }
        this.setData(data);
    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    }
})
