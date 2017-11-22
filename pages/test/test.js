var amapFile = require("../../libs/AMapWX_SDK_V1.2.1/amap-wx.js")
var markersData = []

Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [{
            iconPath: "../../imgs/mark_vs.png",
            id: 0,
            latitude: 39.989643,
            longitude: 116.481028,
            width: 23,
            height: 33
        }, {
                iconPath: "../../imgs/mark_vs.png",
            id: 0,
            latitude: 39.90816,
            longitude: 116.434446,
            width: 24,
            height: 34
        }],
        distance: '',
        cost: '',
        polyline: [],
        textData: {}
    },
    makertap: function (e) {
        var id = e.markerId;
        var that = this;
        that.showMarkerInfo(markersData, id);
        that.changeMarkerColor(markersData, id);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({ key: '19ea604f2c70652cfafbe4843a5ac736' });
        // myAmapFun.getPoiAround({
        //     iconPathSelected: '../../imgs/mark_bs.png', //如：..­/..­/img/marker_checked.png
        //     iconPath: '../../imgs/mark_bs.png', //如：..­/..­/img/marker.png
        //     success: function (data) {
        //         markersData = data.markers;
        //         that.setData({
        //             markers: markersData
        //         });
        //         that.setData({
        //             latitude: markersData[0].latitude
        //         });
        //         that.setData({
        //             longitude: markersData[0].longitude
        //         });
        //         that.showMarkerInfo(markersData, 0);
        //     },
        //     fail: function (info) {
        //         wx.showModal({ title: info.errMsg })
        //     }
        // })
        myAmapFun.getDrivingRoute({
            origin: '116.481028,39.989643',
            destination: '116.434446,39.90816',
            success: function (data) {
                console.log(data)
                var points = [];
                if (data.paths && data.paths[0] && data.paths[0].steps) {
                    var steps = data.paths[0].steps;
                    for (var i = 0; i < steps.length; i++) {
                        var poLen = steps[i].polyline.split(';');
                        for (var j = 0; j < poLen.length; j++) {
                            points.push({
                                longitude: parseFloat(poLen[j].split(',')[0]),
                                latitude: parseFloat(poLen[j].split(',')[1])
                            })
                        }
                    }
                }
                that.setData({
                    polyline: [{
                        points: points,
                        color: "#0091ff",
                        width: 6
                    }]
                });
            },
            fail: function (info) {

            }
        })
    },
    showMarkerInfo: function (data, i) {
        var that = this;
        that.setData({
            textData: {
                name: data[i].name,
                desc: data[i].address
            }
        });
    },
    changeMarkerColor: function (data, i) {
        var that = this;
        var markers = [];
        for (var j = 0; j < data.length; j++) {
            if (j == i) {
                data[j].iconPath = "../../imgs/mark_bs.png"; //如：..­/..­/img/marker_checked.png
            } else {
                data[j].iconPath = "../../imgs/mark_bs.png"; //如：..­/..­/img/marker.png
            }
            markers.push(data[j]);
        }
        that.setData({
            markers: markers
        });
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