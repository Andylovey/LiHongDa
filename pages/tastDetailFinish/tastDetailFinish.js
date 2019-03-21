var app = getApp();
Page({
  data: {
    tl_id: '',
    workShopId: '',
    workShopName: '',
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
    finishedNumber: ''
  },
  inputFinishedNumber: function(event) {
    this.setData({
      finishedNumber: event.detail.value
    })
  },
  taskFinish: function(event) {
    var that = this
    if (that.data.finishedNumber == '') {
      wx.showToast({
        title: '请输入已完成数量',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    wx.navigateTo({
      url: '../confirm/confirm?type=finish&tl_number=' + that.data.tl_number + '&tl_id=' + that.data.tl_id + '&tl_finishednum=' + that.data.finishedNumber + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
    })
  },
  onLoad: function (options) {
    var that = this
    this.setData({
      tl_id: options.id,
      workShopId: options.workShopId,
      workShopName: options.workShopName
    })
    wx.request({
      url: app.globalData.appUrl + '/api/taskManager/selectTaskList?access_token=' + app.globalData.accessToken,
      data: {tl_id: options.id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
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
          that.setData({
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
            tl_transfer: res.data.content.tl_transfer
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
