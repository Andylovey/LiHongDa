var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    input_order: '',
    ino_date: '',
    business_order: '',
    staff_name: '',
    items: []
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/storeInput/showStoreInputDetails?access_token=' + app.globalData.accessToken,
      data: {ino_id: options.id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.content.order.input_order == null) {
            res.data.content.order.input_order = ''
          }
          if (res.data.content.order.ino_date == null) {
            res.data.content.order.ino_date = ''
          }
          if (res.data.content.order.business_order == null) {
            res.data.content.order.business_order = ''
          }
          if (res.data.content.order.staff_name == null) {
            res.data.content.order.staff_name = ''
          }
          for (var i = 0; i < res.data.content.items.length; i++) {
            if (res.data.content.items[i].ini_way == 1) {
              res.data.content.items[i].ini_way = '装箱'
            } else if (res.data.content.items[i].ini_way == 2) {
              res.data.content.items[i].ini_way = '零散'
            }
          }
          that.setData({
            input_order: res.data.content.order.input_order,
            ino_date: utilTip.changeDate(res.data.content.order.ino_date),
            business_order: res.data.content.order.business_order,
            staff_name: res.data.content.order.staff_name,
            items: res.data.content.items
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
