var app = getApp();
Page({
  data: {
    nl_title: '',
    nl_content: ''
  },
  onLoad: function (options) {
    var that = this
    // 修改阅读状态
    wx.request({
      url: app.globalData.appUrl + '/api/noticeList/updateReadlog?access_token=' + app.globalData.accessToken,
      data: {not_id: options.id, nr_type: 1},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          wx.request({
            url: app.globalData.appUrl + '/api/noticeList/selectOneNoticeList?access_token=' + app.globalData.accessToken,
            data: {nl_id: options.id},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              if (res.data.code == 200) {
                if (res.data.content.nl_title == null) {
                  res.data.content.nl_title = ''
                }
                if (res.data.content.nl_content == null) {
                  res.data.content.nl_content = ''
                }
                that.setData({
                  nl_title: res.data.content.nl_title,
                  nl_content: res.data.content.nl_content
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
      }
    })
  }
})
