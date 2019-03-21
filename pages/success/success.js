var app = getApp();
Page({
  data: {
    workShopId: '',
    workShopName: ''
  },
  confirm: function() {
    var that = this
    wx.navigateTo({
      url: '../tastList/tastList?id=' + that.data.workShopId + '&name=' + that.data.workShopName
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      workShopId: options.workShopId,
      workShopName: options.workShopName
    })
  }
})
