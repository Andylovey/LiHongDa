var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    orderStatus: ['全部', '未开始', '生产中', '已暂停', '已完成'],
    orderStatusIndex: 0,
    workShopId: '',
    workShopName: '',
    orderListInfo: [],
    searchData: '',
    start: 0,
    limit: 20
  },
  tastDetailStart: function(event) {
    var that = this
    var status = event.currentTarget.dataset.status
    var id = event.currentTarget.dataset.id
    var number = event.currentTarget.dataset.number
    if (status == '未开始') {
      wx.navigateTo({
        url: '../confirm/confirm?type=start&tl_number=' + number + '&tl_id=' + id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
      })
    } else if (status == '生产中') {
      wx.showToast({
        title: '任务生产中',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '已暂停') {
      wx.showToast({
        title: '任务已暂停',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '已完成') {
      wx.showToast({
        title: '任务已完成',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  tastDetailStop: function(event) {
    var that = this
    var status = event.currentTarget.dataset.status
    var id = event.currentTarget.dataset.id
    if (status == '未开始') {
      wx.showToast({
        title: '任务未开始',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '生产中') {
      wx.navigateTo({
        url: '../tastDetailStop/tastDetailStop?id=' + id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
      })
    } else if (status == '已暂停') {
      wx.showToast({
        title: '任务已暂停',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '已完成') {
      wx.showToast({
        title: '任务已完成',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  tastDetailContinue: function(event) {
    var that = this
    var status = event.currentTarget.dataset.status
    var id = event.currentTarget.dataset.id
    if (status == '未开始') {
      wx.showToast({
        title: '任务未开始',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '生产中') {
      wx.showToast({
        title: '任务在生产中',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '已暂停') {
      wx.navigateTo({
        url: '../tastDetailContinue/tastDetailContinue?id=' + id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
      })
    } else if (status == '已完成') {
      wx.showToast({
        title: '任务已完成',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  tastDetailSwitch: function(event) {
    var that = this
    var status = event.currentTarget.dataset.status
    var id = event.currentTarget.dataset.id
    var finishednum = event.currentTarget.dataset.finishednum
    if (status == '未开始') {
      wx.showToast({
        title: '任务未开始',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '生产中') {
      if (finishednum > 0) {
        wx.navigateTo({
          url: '../tastDetailSwitch/tastDetailSwitch?id=' + id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
        })
      } else {
        wx.showToast({
          title: '还未有完成数量',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    } else if (status == '已暂停') {
      if (finishednum > 0) {
        wx.navigateTo({
          url: '../tastDetailSwitch/tastDetailSwitch?id=' + id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
        })
      } else {
        wx.showToast({
          title: '还未有完成数量',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    } else if (status == '已完成') {
      wx.navigateTo({
        url: '../tastDetailSwitch/tastDetailSwitch?id=' + id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
      })
    }
  },
  tastDetailFinish: function(event) {
    var that = this
    var status = event.currentTarget.dataset.status
    var id = event.currentTarget.dataset.id
    if (status == '未开始') {
      wx.showToast({
        title: '任务未开始',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '生产中') {
      wx.navigateTo({
        url: '../tastDetailFinish/tastDetailFinish?id=' + id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
      })
    } else if (status == '已暂停') {
       wx.showToast({
        title: '任务已暂停',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (status == '已完成') {
       wx.showToast({
        title: '任务已完成',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  loadData: function(start, limit, id1, id2, name1) {
    var that = this
    if (id2 == 0) {
      id2 = ''
    }
    wx.request({
      url: app.globalData.appUrl + '/api/taskManager/showTaskList?access_token=' + app.globalData.accessToken,
      data: {start: start, limit: limit, id1: id1, id2: id2, name1: name1},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        wx.stopPullDownRefresh()
        if (res.data.code == 200) {
          for (var i = 0; i < res.data.content.records.length; i++) {
            if (res.data.content.records[i].tl_status == 1) {
              res.data.content.records[i].tl_status = '未开始'
              res.data.content.records[i].tl_status_style = 'text-red'
            } else if (res.data.content.records[i].tl_status == 2) {
              res.data.content.records[i].tl_status = '生产中'
              res.data.content.records[i].tl_status_style = 'text-blue'
            } else if (res.data.content.records[i].tl_status == 3) {
              res.data.content.records[i].tl_status = '已暂停'
              res.data.content.records[i].tl_status_style = 'text-red'
            } else if (res.data.content.records[i].tl_status == 4) {
              res.data.content.records[i].tl_status = '已完成'
              res.data.content.records[i].tl_status_style = 'text-green'
            }
            res.data.content.records[i].sog_price = utilTip.toThousands(res.data.content.records[i].sog_price)
            res.data.content.records[i].sog_total = utilTip.toThousands(res.data.content.records[i].sog_total)
            res.data.content.records[i].tl_unfinishednum = res.data.content.records[i].tl_tasknum - res.data.content.records[i].tl_finishednum
            if (res.data.content.records[i].tl_unfinishednum < 0) {
              res.data.content.records[i].tl_unfinishednum = 0
            }
            if (res.data.content.records[i].clt_name == null) {
              res.data.content.records[i].clt_name = ''
            }
            if (res.data.content.records[i].sog_product == null) {
              res.data.content.records[i].sog_product = ''
            }
            if (res.data.content.records[i].sog_spec == null) {
              res.data.content.records[i].sog_spec = ''
            }
            if (res.data.content.records[i].sog_makeup_num == null) {
              res.data.content.records[i].sog_makeup_num = ''
            }
            if (res.data.content.records[i].process_name == null) {
              res.data.content.records[i].process_name = ''
            }
            if (res.data.content.records[i].machine_name == null) {
              res.data.content.records[i].machine_name = ''
            }
          }
          if (start == 0) {
            that.setData({
              orderListInfo: res.data.content.records,
              start: start + limit
            })
          } else {
            var dataArray = res.data.content.records
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
    that.loadData(0, that.data.limit, that.data.workShopId, that.data.orderStatusIndex, that.data.searchData)
  },
  onPullDownRefresh: function () {
    var that = this
    that.loadData(that.data.start, that.data.limit, that.data.workShopId, that.data.orderStatusIndex, that.data.searchData)
  },
  onLoad: function (options) {
    var that = this
    this.setData({
      workShopId: options.id,
      workShopName: options.name
    })
    that.loadData(0, that.data.limit, that.data.workShopId, that.data.orderStatusIndex, '')
    wx.setNavigationBarTitle({
      title: that.data.workShopName + '-任务列表'
    })
  }
})