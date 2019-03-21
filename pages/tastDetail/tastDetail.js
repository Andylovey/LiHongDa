var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    tl_id: '',
    tl_number: '',
    clt_name: '',
    sog_product: '',
    sog_spec: '',
    sog_makeup_num: '',
    process_name: '',
    machine_name: '',
    tl_status: '',
    tl_tasknum: '',
    tl_finishednum: '',
    tl_unfinishednum: '',
    tl_transfer: '',
    tasklog: []
  },
  tastDetailStart: function(event) {
    var status = event.currentTarget.dataset.status
    var id = event.currentTarget.dataset.id
    var number = event.currentTarget.dataset.number
    if (status == '未开始') {
      wx.navigateTo({
        url: '../confirm/confirm?type=start&tl_number=' + number + '&tl_id=' + id
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
        url: '../tastDetailStop/tastDetailStop?id=' + id
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
        url: '../tastDetailContinue/tastDetailContinue?id=' + id
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
          url: '../tastDetailSwitch/tastDetailSwitch?id=' + id
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
          url: '../tastDetailSwitch/tastDetailSwitch?id=' + id
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
        url: '../tastDetailSwitch/tastDetailSwitch?id=' + id
      })
    }
  },
  tastDetailFinish: function(event) {
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
        url: '../tastDetailFinish/tastDetailFinish?id=' + id
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
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/taskManager/selectTaskList?access_token=' + app.globalData.accessToken,
      data: {tl_id: options.id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.content.tl_number == null) {
            res.data.content.tl_number = ''
          }
          if (res.data.content.clt_name == null) {
            res.data.content.clt_name = ''
          }
          if (res.data.content.sog_product == null) {
            res.data.content.sog_product = ''
          }
          if (res.data.content.sog_spec == null) {
            res.data.content.sog_spec = ''
          }
          if (res.data.content.sog_makeup_num == null) {
            res.data.content.sog_makeup_num = ''
          }
          if (res.data.content.process_name == null) {
            res.data.content.process_name = ''
          }
          if (res.data.content.machine_name == null) {
            res.data.content.machine_name = ''
          }
          if (res.data.content.tl_status == null) {
            res.data.content.tl_status = ''
          }
          if (res.data.content.tl_tasknum == null) {
            res.data.content.tl_tasknum = ''
          }
          if (res.data.content.tl_finishednum == null) {
            res.data.content.tl_finishednum = ''
          }
          if (res.data.content.tl_unfinishednum == null) {
            res.data.content.tl_unfinishednum = ''
          }
          if (res.data.content.tl_transfer == null) {
            res.data.content.tl_transfer = ''
          }
          if (res.data.content.tl_status == 1) {
            res.data.content.tl_status = '未开始'
          } else if (res.data.content.tl_status == 2) {
            res.data.content.tl_status = '生产中'
          } else if (res.data.content.tl_status == 3) {
            res.data.content.tl_status = '已暂停'
          } else if (res.data.content.tl_status == 4) {
            res.data.content.tl_status = '已完成'
          }
          res.data.content.tl_unfinishednum = res.data.content.tl_tasknum - res.data.content.tl_finishednum
          if (res.data.content.tl_unfinishednum < 0) {
            res.data.content.tl_unfinishednum = 0
          }
          for (var i = 0; i < res.data.content.tasklog.length; i++) {
            res.data.content.tasklog[i].log_operatetime = utilTip.changeDate(res.data.content.tasklog[i].log_operatetime)
          }
          that.setData({
            tl_id: options.id,
            tl_number: res.data.content.tl_number,
            clt_name: res.data.content.clt_name,
            sog_product: res.data.content.sog_product,
            sog_spec: res.data.content.sog_spec,
            sog_makeup_num: res.data.content.sog_makeup_num,
            process_name: res.data.content.process_name,
            machine_name: res.data.content.machine_name,
            tl_status: res.data.content.tl_status,
            tl_tasknum: res.data.content.tl_tasknum,
            tl_finishednum: res.data.content.tl_finishednum,
            tl_unfinishednum: res.data.content.tl_unfinishednum,
            tl_transfer: res.data.content.tl_transfer,
            tasklog: res.data.content.tasklog
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
