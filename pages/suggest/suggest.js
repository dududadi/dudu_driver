Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [
            '发布订单',
            '等待乘客',
            '乘车中',
            '支付',
            '安全与隐私',
            '服务评价',
            '客户服务',
            '软件问题',
            '其它'
        ],
        index: -1,
        count: 0,
        buttonClass: 'disabledButton',
        disabled: true
    },

    //监听选择框选择事件
    listenerPickerSelected: function (e) {
        this.setData({
            index: e.detail.value
        })

        if (this.data.array[this.data.index] != null && this.data.count != 0) {
            this.setData({
                buttonClass: 'button',
                disabled: false
            })
        } else {
            this.setData({
                buttonClass: 'disabledButton',
                disabled: true
            })
        }
    },

    //监听输入框输入事件
    enter: function (e) {
        this.setData({
            count: e.detail.value.length
        })

        if (this.data.array[this.data.index] != null && this.data.count != 0) {
            this.setData({
                buttonClass: 'button',
                disabled: false
            })
        } else {
            this.setData({
                buttonClass: 'disabledButton',
                disabled: true
            })
        }
    },

    //发送信息
    sendMessage: function (e) {
        wx.showToast({
            title: '反馈成功',
            icon: 'success',
            duration: 2000
        })
    }
})