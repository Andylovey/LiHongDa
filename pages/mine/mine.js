var app = getApp();
Page({
  data: {
    username: '',
    customerRight: '',
    orderRight: '',
    tastRight: '',
    noticeRight: '',
    messageRight: '',
    noticeNumber: '',
    messageNumber: ''
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
        that.setData({
          username: res.data.content.username
        })
      }
    })

    wx.request({
      url: app.globalData.appUrl + '/api/permission/getAllPermissionsForApp?access_token=' + app.globalData.accessToken,
      data: {},
      method: 'GET',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          for (var i = 0; i < res.data.content.length; i++) {
            if (res.data.content[i].p_id == 104) {
              that.setData({
                customerRight: res.data.content[i].p_id
              })
            } else if (res.data.content[i].p_id == 136) {
              that.setData({
                orderRight: res.data.content[i].p_id
              })
            } else if (res.data.content[i].p_id == 148) {
              that.setData({
                tastRight: res.data.content[i].p_id
              })
            } else if (res.data.content[i].p_id == 301) {
              wx.request({
                url: app.globalData.appUrl + '/api/noticeList/showCompanyNotificationMobile?access_token=' + app.globalData.accessToken,
                data: {status: 1, start: 0, limit: 20},
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                  that.setData({
                    noticeNumber: res.data.content.total
                  })
                }
              })
              that.setData({
                noticeRight: res.data.content[i].p_id
              })
            } else if (res.data.content[i].p_id == 339) {
              wx.request({
                url: app.globalData.appUrl + '/api/noticeList/showSystemNotificationMobile?access_token=' + app.globalData.accessToken,
                data: {status: 1, start: 0, limit: 20},
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res) {
                  that.setData({
                    messageNumber: res.data.content.total
                  })
                }
              })
              that.setData({
                messageRight: res.data.content[i].p_id
              })
            }
          }
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
