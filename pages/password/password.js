var app = getApp();
Page({
  data: {
    userId: '',
    oldPassWord: '',
    newPassWord: '',
    confirmNewPassWord: ''
  },
  inputOldPassWord: function(event) {
    this.setData({
      oldPassWord: event.detail.value
    })
  },
  inputNewPassWord: function(event) {
    this.setData({
      newPassWord: event.detail.value
    })
  },
  inputConfirmNewPassWord: function(event) {
    this.setData({
      confirmNewPassWord: event.detail.value
    })
  },
  modify: function () {
    var that = this
    if (that.data.oldPassWord == "" || that.data.oldPassWord == undefined) {
        wx.showToast({
          title: '请输入原密码',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
    }
    if (that.data.newPassWord == "" || that.data.newPassWord == undefined) {
        wx.showToast({
          title: '请输入新密码',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
    }
    if (that.data.confirmNewPassWord == "" || that.data.confirmNewPassWord == undefined) {
        wx.showToast({
          title: '请输入确认新密码',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
    }
    if (that.data.newPassWord != that.data.confirmNewPassWord) {
        wx.showToast({
          title: '您输入的新密码不一致',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
    }
    wx.request({
      url: app.globalData.appUrl + '/api/getUser?access_token=' + app.globalData.accessToken,
      data: {},
      method: 'GET',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            userId: res.data.content.user_id
          })

          wx.request({
            url: app.globalData.appUrl + '/api/userManager/updateUserPassword?access_token=' + app.globalData.accessToken,
            data: {
              user_id: that.data.userId,
              old_password: that.data.oldPassWord,
              new_password: that.data.newPassWord
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 1000,
                  mask: true
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
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
