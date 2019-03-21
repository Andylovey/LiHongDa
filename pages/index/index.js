var app = getApp();
Page({
  data: {
    username: '',
    password: ''
  },
  inputUserName: function(event) {
    this.setData({
      username: event.detail.value
    })
  },
  inputpassWord: function(event) {
    this.setData({
      password: event.detail.value
    })
  },
  login: function(event) {
    var that = this
    if (that.data.username == "" || that.data.username == undefined) {
        wx.showToast({
          title: '请输入用户名',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
    }
    if (that.data.password == "" || that.data.password == undefined) {
        wx.showToast({
          title: '请输入密码',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
    }
    wx.request({
      url: app.globalData.domainUrl + '/login',
      data: {
        username: that.data.username,
        password: that.data.password
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.access_token != undefined) {
            app.globalData.accessToken = res.data.access_token;
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000,
              mask: true
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '../mine/mine'
              })
            }, 1500)
        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none',
            duration: 1000,
            mask: true
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  onLoad: function () {
    var that = this
    app.getUserInfo()
  }
})
