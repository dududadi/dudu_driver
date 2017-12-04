//index.js
//CSDN微信小程序开发专栏:http://blog.csdn.net/column/details/13721.html
//获取应用实例
var app = getApp()
Page({
    data: {
        stars: [0, 1, 2, 3, 4],
        normalSrc: "../../imgs/star-empty.png",
        selectedSrc: "../../imgs/star-full.png",
        halfSrc: "../../imgs/star-half-full.png",
        key: 0,//评分
        comment:'',//评价
        orderId:''
    },
    onLoad: function (e) {
        console.log(e);
        this.setData({
            orderId: e.orderId
        })
    },
    inputComment:function(e){
        this.setData({
            comment: e.detail.value
        })
    },
    submitComment:function(){
        var comment = this.data.comment;
        var score = this.data.key;
        var orderId = this.data.orderId;
        wx.request({
            url: 'https://www.forhyj.cn/miniapp/Driver/comment',
            data: {
                driverOpenId: wx.getStorageSync('openid'),
                orderId: orderId,
                comment: comment,
                score:score
            },
            method: 'POST',
            success: function (res) {
                if (res.data){
                    wx.showModal({
                        title: '评价成功',
                        content: '感谢您的评价，期待下次为您服务',
                        success: function (res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '../main/main',
                                })
                            } else if (res.cancel) {
                                wx.redirectTo({
                                    url: '../main/main',
                                })
                            }
                        }
                    })
                }else{
                    wx.showModal({
                        title: '评价失败',
                        content: '操作出错，请重试'
                    })
                }
            }
        })
    },
    //点击右边,半颗星
    selectLeft: function (e) {
        var key = e.currentTarget.dataset.key
        if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
            //只有一颗星的时候,再次点击,变为0颗
            key = 0;
        }
        console.log("得" + key + "分")
        this.setData({
            key: key
        })

    },
    //点击左边,整颗星
    selectRight: function (e) {
        var key = e.currentTarget.dataset.key
        console.log("得" + key + "分")
        this.setData({
            key: key
        })
    }
})