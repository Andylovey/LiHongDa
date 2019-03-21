var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    receipt_order: '',
    spr_name: '',
    reco_date: '',
    staff_name: '',
    items: []
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/receiptManager/showReceiptOrderDetails?access_token=' + app.globalData.accessToken,
      data: {reco_id: options.id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.content.orders[0].receipt_order == null) {
            res.data.content.orders[0].receipt_order = ''
          }
          if (res.data.content.orders[0].spr_name == null) {
            res.data.content.orders[0].spr_name = ''
          }
          if (res.data.content.orders[0].reco_date == null) {
            res.data.content.orders[0].reco_date = ''
          }
          if (res.data.content.orders[0].staff_name == null) {
            res.data.content.orders[0].staff_name = ''
          }
          that.setData({
            receipt_order: res.data.content.orders[0].receipt_order,
            spr_name: res.data.content.orders[0].spr_name,
            reco_date: utilTip.changeDate(res.data.content.orders[0].reco_date),
            staff_name: res.data.content.orders[0].staff_name,
            items: res.data.content.orders[0].items
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
})
