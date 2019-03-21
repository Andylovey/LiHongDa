var app = getApp();
Page({
  data: {
    id: '',
    msg: ''
  },
  confirm: function() {
    var that = this
    wx.navigateTo({
      url: '../tastDetail/tastDetail?id=' + that.data.id
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id,
      msg: options.msg
    })
  }
})
