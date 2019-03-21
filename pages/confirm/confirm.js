var app = getApp();
Page({
  data: {
    workShopId: '',
    orderNumber: '',
    workShopName: '',
    orderTast: '',
    tastData: {},
    tastUrl: ''
  },
  taskExecute: function(tastData, tastUrl) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + tastUrl + '?access_token=' + app.globalData.accessToken,
      data: tastData,
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          console.log('ok');
          console.log(tastData.tl_id);
          console.log(that.data.workShopId);
          console.log(that.data.workShopName);
          var url = '../success/success?id=' + tastData.tl_id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName;
          console.log(url);
          wx.reLaunch({
            url: '../success/success?id=' + tastData.tl_id + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
          })
        } else {
          wx.reLaunch({
            url: '../fail/fail?id=' + tastData.tl_id + '&msg=' + res.data.msg
          })
        }
      }
    })
  },
  confirm: function() {
    var that = this
    that.taskExecute(that.data.tastData, that.data.tastUrl)
  },
  onLoad: function (options) {
    var that = this
    var tastData = {}
    var tastUrl = ''
    that.setData({
      orderNumber: options.tl_number,
      workShopId: options.workShopId,
      workShopName: options.workShopName
    })
    if (options.type == 'start') {
      tastData = {tl_id: options.tl_id}
      tastUrl = '/api/taskManager/startTaskList'
      that.setData({
        orderTast: '开始',
        tastData: tastData,
        tastUrl: tastUrl
      })
    } else if (options.type == 'stop') {
      tastData = {tl_id: options.tl_id, tl_finishednum: options.tl_finishednum}
      tastUrl = '/api/taskManager/pauseTaskList'
      that.setData({
        orderTast: '暂停',
        tastData: tastData,
        tastUrl: tastUrl
      })
    } else if (options.type == 'continue') {
      tastData = {tl_id: options.tl_id}
      tastUrl = '/api/taskManager/continueTaskList'
      that.setData({
        orderTast: '继续',
        tastData: tastData,
        tastUrl: tastUrl
      })
    } else if (options.type == 'switch') {
      tastData = {tl_id: options.tl_id, tl_transfer: options.tl_transfer, tl_whokshop: options.tl_whokshop, tl_process: options.tl_process}
      tastUrl = '/api/taskManager/transferTaskList'
      that.setData({
        orderTast: '转交',
        tastData: tastData,
        tastUrl: tastUrl
      })
    } else if (options.type == 'finish') {
      tastData = {tl_id: options.tl_id, tl_finishednum: options.tl_finishednum}
      tastUrl = '/api/taskManager/finishTaskList'
      that.setData({
        orderTast: '完成',
        tastData: tastData,
        tastUrl: tastUrl
      })
    }
  }
})
