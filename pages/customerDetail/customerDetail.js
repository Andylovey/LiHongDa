var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    clt_name: '',
    clt_contact: '',
    clt_sex: '',
    clt_telephone: '',
    clt_cellphone: '',
    clt_wechat: '',
    clt_qq: '',
    clt_address: '',
    clt_email: '',
    order_num: '',
    order_money: '',
    store_num: '',
    store_money: ''
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/clientManager/showClientDetails?access_token=' + app.globalData.accessToken,
      data: {clt_id: options.id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.content.clt_name == null) {
            res.data.content.clt_name = ''
          }
          if (res.data.content.clt_contact == null) {
            res.data.content.clt_contact = ''
          }
          if (res.data.content.clt_sex) {
            res.data.content.clt_sex = '女'
          } else {
            res.data.content.clt_sex = '男'
          }
          if (res.data.content.clt_telephone == null) {
            res.data.content.clt_telephone = ''
          }
          if (res.data.content.clt_cellphone == null) {
            res.data.content.clt_cellphone = ''
          }
          if (res.data.content.clt_wechat == null) {
            res.data.content.clt_wechat = ''
          }
          if (res.data.content.clt_qq == null) {
            res.data.content.clt_qq = ''
          }
          if (res.data.content.clt_address == null) {
            res.data.content.clt_address = ''
          }
          if (res.data.content.clt_email == null) {
            res.data.content.clt_email = ''
          }
          if (res.data.content.order_num == null) {
            res.data.content.order_num = ''
          }
          if (res.data.content.order_money == null) {
            res.data.content.order_money = ''
          }
          if (res.data.content.store_num == null) {
            res.data.content.store_num = ''
          }
          if (res.data.content.store_money == null) {
            res.data.content.store_money = ''
          }
          that.setData({
            clt_name: res.data.content.clt_name,
            clt_contact: res.data.content.clt_contact,
            clt_sex: res.data.content.clt_sex,
            clt_telephone: res.data.content.clt_telephone,
            clt_cellphone: res.data.content.clt_cellphone,
            clt_wechat: res.data.content.clt_wechat,
            clt_qq: res.data.content.clt_qq,
            clt_address: res.data.content.clt_address,
            clt_email: res.data.content.clt_email,
            order_num: res.data.content.order_num,
            order_money: utilTip.toThousands(res.data.content.order_money),
            store_num: res.data.content.store_num,
            store_money: utilTip.toThousands(res.data.content.store_money)
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
