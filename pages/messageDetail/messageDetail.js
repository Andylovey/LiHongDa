var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    ns_id: '',
    ns_type: '',
    generalNo: '',
    content:'',
    ns_recordid: ''
  },
  checkDetail: function () {
    var that = this
    if (that.data.ns_type == '新订单') {
      wx.navigateTo({
        url: '../orderDetail/orderDetail?id=' + that.data.ns_recordid
      })
    } else if (that.data.ns_type == '生产任务') {
      wx.navigateTo({
        url: '../tastDetail/tastDetail?id=' + that.data.ns_recordid
      })
    } else if (that.data.ns_type == '采购收货') {
      wx.navigateTo({
        url: '../receiptDetail/receiptDetail?id=' + that.data.ns_recordid
      })
    } else if (that.data.ns_type == '入库') {
      wx.navigateTo({
        url: '../importDetail/importDetail?id=' + that.data.ns_recordid
      })
    } else if (that.data.ns_type == '发货出库') {
      wx.navigateTo({
        url: '../exportDetail/exportDetail?id=' + that.data.ns_recordid
      })
    }
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      ns_id: options.id
    })
    // 修改阅读状态
    wx.request({
      url: app.globalData.appUrl + '/api/noticeList/updateReadlog?access_token=' + app.globalData.accessToken,
      data: {not_id: options.id, nr_type: 2},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          wx.request({
            url: app.globalData.appUrl + '/api/noticeList/showOneSystemNoticeList?access_token=' + app.globalData.accessToken,
            data: {ns_id: options.id},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              if (res.data.code == 200) {
                if (res.data.content.ns_type == null) {
                  res.data.content.ns_type = ''
                }
                if (res.data.content.generalNo == null) {
                  res.data.content.generalNo = ''
                }
                if (res.data.content.content == null) {
                  res.data.content.content = ''
                }
                that.setData({
                  ns_type: res.data.content.ns_type,
                  generalNo: res.data.content.generalNo,
                  content: res.data.content.content,
                  ns_recordid: res.data.content.ns_recordid
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1000,
                  mask: true
                })
              }
            }
          })
        }
      }
    })
  }
})
