var app = getApp();
Page({
  data: {
    username: '',
    position: ''
  },
  logout: function(event) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/logout?access_token=' + app.globalData.accessToken,
      data: {},
      method: 'GET',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        app.globalData.accessToken = '';
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../index/index'
          })
        }, 1500)
      }
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/getUser?access_token=' + app.globalData.accessToken,
      data: {},
      method: 'GET',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.content.duty_name != null) {
            that.setData({
              position: res.data.content.duty_name
            })
          }
          that.setData({
            username: res.data.content.username
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
