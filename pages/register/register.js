Page({
    data: {
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
