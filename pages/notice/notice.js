var app = getApp();
Page({
  data: {
    noticeListInfo: [],
    searchData: '',
    start: 0,
    limit: 20
  },
  loadData: function(start, limit, name1) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/noticeList/showCompanyNotificationMobile?access_token=' + app.globalData.accessToken,
      data: {start: start, limit: limit, name1: name1, status: 0},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        if (res.data.code == 200) {
          if (res.data.content.records.length > 0) {
            if (start == 0) {
              that.setData({
                noticeListInfo: res.data.content.records,
                start: start + limit
              })
            } else {
              var dataArray = res.data.content.records
              for (var i = 0; i < that.data.noticeListInfo.length; i++) {
                dataArray.push(that.data.noticeListInfo[i])
              }
              that.setData({
                noticeListInfo: dataArray,
                start: start + limit
              })
            }
            wx.pageScrollTo({
              scrollTop: 0
            })
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
  },
  inputSearchData: function(event) {
    this.setData({
      searchData: event.detail.value
    })
  },
  search: function(event) {
    var that = this
    that.loadData(0, that.data.limit, that.data.searchData)
  },
  onPullDownRefresh: function () {
    var that = this
    that.loadData(that.data.start, that.data.limit, that.data.searchData)
  },
  onLoad: function () {
    var that = this
    that.loadData(0, that.data.limit, '')
  }
})
