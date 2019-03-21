var app = getApp();
Page({
  data: {
    workshop: []
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/dropDown/selectWorkshopList?access_token=' + app.globalData.accessToken,
      data: {},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            workshop: res.data.content
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
