var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    orderStatus: ['全部', '待生产', '生产中', '已完成'],
    orderStatusIndex: 0,
    orderListInfo: [],
    searchData: '',
    start: 0,
    limit: 20
  },
  loadData: function(start, limit, mobile_name, sog_status) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/manufactureOrder/showManufactureOrder?access_token=' + app.globalData.accessToken,
      data: {start: start, limit: limit, mobile_name: mobile_name, sog_status: sog_status},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        if (res.data.code == 200) {
          if (res.data.content.records.length > 0) {
            for (var i = 0; i < res.data.content.records[0].form.length; i++) {
              if (res.data.content.records[0].form[i].sog_status == 1) {
                res.data.content.records[0].form[i].sog_status = '待生产';
              } else if (res.data.content.records[0].form[i].sog_status == 2) {
                res.data.content.records[0].form[i].sog_status = '生产中';
              } else if (res.data.content.records[0].form[i].sog_status == 3) {
                res.data.content.records[0].form[i].sog_status = '已完成';
              }
              res.data.content.records[0].form[i].sog_price = utilTip.toThousands(res.data.content.records[0].form[i].sog_price);
              res.data.content.records[0].form[i].sog_total = utilTip.toThousands(res.data.content.records[0].form[i].sog_total);
            }
            if (start == 0) {
              that.setData({
                orderListInfo: res.data.content.records[0].form,
                start: start + limit
              })
            } else {
              var dataArray = res.data.content.records[0].form
              for (var i = 0; i < that.data.orderListInfo.length; i++) {
                dataArray.push(that.data.orderListInfo[i])
              }
              that.setData({
                orderListInfo: dataArray,
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
  bindSearchScan: function() {
    var that = this
    wx.scanCode({
      success: (res) => {
        this.setData({
          searchData: res.result
        })
        that.search()
      }
    })
  },
  bindOrderStatusPickerChange: function(e) {
    this.setData({
      orderStatusIndex: e.detail.value
    })
  },
  inputSearchData: function(event) {
    this.setData({
      searchData: event.detail.value
    })
  },
  search: function(event) {
    var that = this
    that.loadData(0, that.data.limit, that.data.searchData, that.data.orderStatusIndex)
  },
  onPullDownRefresh: function () {
    var that = this
    that.loadData(that.data.start, that.data.limit, '', that.data.orderStatusIndex)
  },
  onLoad: function () {
    var that = this
    that.loadData(0, that.data.limit, '', that.data.orderStatusIndex)
  }
})