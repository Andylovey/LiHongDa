var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    tl_sog_id: '',
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
    tl_transfernum: '',
    switchNumber: '',
    workShopNameArray: [],
    workShopIdArray: [],
    workShopIndex: 0,
    workShopProcessName: [],
    workShopProcessId: [],
    workShopProcessIndex: 0,
    machineName: [],
    machineId: [],
    machineIndex: 0
  },
  inputSwitchdNumber: function(event) {
    this.setData({
      switchNumber: event.detail.value
    })
  },
  bindWorkShopPickerChange: function(e) {
    var that = this
    that.setData({
      workShopIndex: e.detail.value
    })
    that.initWorkShopProcess(that.data.workShopIdArray[that.data.workShopIndex])
  },
  bindWorkShopProcessPickerChange: function(e) {
    var that = this
    that.setData({
      workShopProcessIndex: e.detail.value
    })
    that.initMachine(that.data.workShopIdArray[that.data.workShopIndex], that.data.workShopProcessId[that.data.workShopProcessIndex])
  },
  bindMachinePickerChange: function(e) {
    var that = this
    that.setData({
      machineIndex: e.detail.value
    })
  },
  taskSwitch: function(event) {
    var that = this
    if (that.data.switchNumber == '') {
      wx.showToast({
        title: '请输入转交数量',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (that.data.switchNumber > that.data.tl_transfernum) {
      wx.showToast({
        title: '转交数量已超过完成数量',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (that.data.workShopIndex == 0) {
      wx.showToast({
        title: '请选择车间',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (that.data.workShopProcessIndex == 0) {
      wx.showToast({
        title: '请选择工序',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (that.data.machineIndex == 0) {
      wx.showToast({
        title: '请选择机台',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return false;
    }
    wx.navigateTo({
      url: '../confirm/confirm?type=switch&tl_number=' + that.data.tl_number + '&tl_id=' + that.data.tl_id + '&tl_transfer=' + that.data.switchNumber + '&tl_whokshop=' + that.data.workShopIdArray[that.data.workShopIndex] + '&tl_process=' + that.data.machineId[that.data.machineIndex] + '&workShopId=' + that.data.workShopId + '&workShopName=' + that.data.workShopName
    })
  },
  initWorkShop: function() {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/dropDown/selectWorkshopList?access_token=' + app.globalData.accessToken,
      data: {type: 2, sog_id: that.data.tl_sog_id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          var workShopNameArray = new Array()
          var workShopIdArray = new Array()
          for (var i = 0; i < res.data.content.length; i++) {
            workShopNameArray.push(res.data.content[i].name)
            workShopIdArray.push(res.data.content[i].id)
          }
          that.setData({
            workShopNameArray: workShopNameArray,
            workShopIdArray: workShopIdArray
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
  initWorkShopProcess: function(ws_id) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/dropDown/selectWorkshopProcess?access_token=' + app.globalData.accessToken,
      data: {type: 2, sog_id: that.data.tl_sog_id, ws_id: ws_id, wsp_fid: 0},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          var workShopProcessNameArray = new Array()
          var workShopProcessIdArray = new Array()
          for (var i = 0; i < res.data.content.length; i++) {
            workShopProcessNameArray.push(res.data.content[i].name)
            workShopProcessIdArray.push(res.data.content[i].id)
          }
          that.setData({
            workShopProcessName: workShopProcessNameArray,
            workShopProcessId: workShopProcessIdArray,
            workShopProcessIndex: 0
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
  initMachine: function(ws_id, wsp_fid) {
    var that = this
    wx.request({
      url: app.globalData.appUrl + '/api/dropDown/selectWorkshopProcess?access_token=' + app.globalData.accessToken,
      data: {type: 2, sog_id: that.data.tl_sog_id, ws_id: ws_id, wsp_fid: wsp_fid},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          var machineNameArray = new Array()
          var machineIdArray = new Array()
          for (var i = 0; i < res.data.content.length; i++) {
            machineNameArray.push(res.data.content[i].name)
            machineIdArray.push(res.data.content[i].id)
          }
          that.setData({
            machineName: machineNameArray,
            machineId: machineIdArray,
            machineIndex: 0
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
          res.data.content.tl_transfernum = res.data.content.tl_finishednum - res.data.content.tl_transfer
          if (res.data.content.tl_transfernum < 0) {
            res.data.content.tl_transfernum = 0
          }
          that.setData({
            tl_sog_id: res.data.content.tl_sog_id,
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
            tl_transfernum: res.data.content.tl_transfernum
          })
          that.initWorkShop()
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
