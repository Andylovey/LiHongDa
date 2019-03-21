var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    export_order: '',
    clt_name: '',
    spe_date: '',
    clt_contact: '',
    clt_cellphone: '',
    sog_spec: '',
    spe_transport_tel: '',
    spe_totalmoney: '',
    transport_name: '',
    sog_makeup_num: '',
    car_no: '',
    staff_name: '',
    items: []
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/storeExport/showStoreExportDetails?access_token=' + app.globalData.accessToken,
      data: {spe_id: options.id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            export_order: res.data.content.orders[0].export_order,
            clt_name: res.data.content.orders[0].clt_name,
            spe_date: utilTip.changeDate(res.data.content.orders[0].spe_date),
            sog_spec: res.data.content.orders[0].sog_spec,
            clt_contact: res.data.content.orders[0].clt_contact,
            clt_cellphone: res.data.content.orders[0].clt_cellphone,
            spe_totalmoney: res.data.content.orders[0].spe_totalmoney,
            transport_name: res.data.content.orders[0].transport_name,
            spe_transport_tel: res.data.content.orders[0].spe_transport_tel,
            sog_makeup_num: res.data.content.orders[0].sog_makeup_num,
            car_no: res.data.content.orders[0].car_no,
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
