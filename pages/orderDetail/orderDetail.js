var utilTip = require('../../utils/utilTip.js')
var app = getApp();
Page({
  data: {
    openStatus: [true, true, true, true, true, true],
    openImage: ['arrow-up.png', 'arrow-up.png', 'arrow-up.png', 'arrow-up.png', 'arrow-up.png', 'arrow-up.png'],
    imgStatus: false,
    bigImg: '',
    serialno: '',
    clt_name: '',
    sog_product: '',
    sog_orderdate: '',
    sog_deliverydate: '',
    sog_num: '',
    sog_price: '',
    sog_total: '',
    sog_finishednum: '',
    in_num: '',
    ex_num: '',
    store_num: '',
    sog_spec: '',
    packagedemand: '',
    paperstyle: '',
    sog_makeup_num: '',
    mould: '',
    stamping: '',
    printdemand: '',
    sog_requirements: '',
    sog_content: '',
    orderPurchase: [],
    salesorderProcess: [],
    imageList: [],
    mobileByInput: [],
    mobileByExport: [],
    sog_id : '',
    sog_aduitstatus : '',
    paramsId: { id: 0}
  },
  openContent: function (event) {
    var that = this
    var openStatusArray = that.data.openStatus
    var openImageArray = that.data.openImage
    if (openStatusArray[event.currentTarget.dataset.index]) {
      openStatusArray[event.currentTarget.dataset.index] = false
      openImageArray[event.currentTarget.dataset.index] = 'arrow-down.png'
    } else {
      openStatusArray[event.currentTarget.dataset.index] = true
      openImageArray[event.currentTarget.dataset.index] = 'arrow-up.png'
    }
    this.setData({
      openStatus: openStatusArray,
      openImage: openImageArray
    })
  },
  showImg: function (event) {
    var imgList = event.currentTarget.dataset.list;//获取data-list
    var src = event.currentTarget.dataset.src;//获取data-src
    wx.previewImage({
      urls: [imgList],
      current : src
    })
  },
  hideImg: function (event) {
    var that = this
    this.setData({
      imgStatus: false
    })
  },
  onLoad: function (options) {
    var that = this
    that.data.sog_id = options.id;
    that.data.paramsId.id = options.id;
    wx.request({
      url: app.globalData.appUrl + '/api/manufactureOrder/selectMobileManufacture?access_token=' + app.globalData.accessToken,
      data: {sog_id: options.id},
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (res.data.code == 200) {
          if (res.data.content.sog_printdemand == null) {
            res.data.content.sog_printdemand = ''
          }
          if (res.data.content.sog_content == null) {
            res.data.content.sog_content = ''
          }
          if (res.data.content.sog_aduitstatus == true) {
            res.data.content.sog_aduitstatus = '反审';
          }else {
            res.data.content.sog_aduitstatus = '审核';
          }
          for (var i = 0; i < res.data.content.salesorderProcess.length ; i++){
            if (res.data.content.salesorderProcess[i].tl_status == 1){
              res.data.content.salesorderProcess[i].status = '待生产'
            }
            else if(res.data.content.salesorderProcess[i].tl_status == 2){
              res.data.content.salesorderProcess[i].status = '生产中'
            }
            else if(res.data.content.salesorderProcess[i].tl_status == 3){
              res.data.content.salesorderProcess[i].status = '已暂停'
            }
            else if(res.data.content.salesorderProcess[i].tl_status == 4){
              res.data.content.salesorderProcess[i].status = '已完成'
            }
          }
          for (var i = 0; i < res.data.content.salesorderProcess.length; i ++) {
            res.data.content.salesorderProcess[i].sop_price = utilTip.toThousands(res.data.content.salesorderProcess[i].sop_price);
          }
          for (var i = 0; i < res.data.content.mobileByInput.length; i ++) {
            res.data.content.mobileByInput[i].store_date = utilTip.changeDate(res.data.content.mobileByInput[i].store_date);
          }
          for (var i = 0; i < res.data.content.mobileByExport.length; i ++) {
            res.data.content.mobileByExport[i].store_date = utilTip.changeDate(res.data.content.mobileByExport[i].store_date);
          }
          that.setData({
            serialno: res.data.content.serialno,
            clt_name: res.data.content.clt_name,
            sog_product: res.data.content.sog_product,
            sog_orderdate: res.data.content.sog_orderdate,
            sog_deliverydate: res.data.content.sog_deliverydate,
            sog_num: res.data.content.sog_num,
            sog_price: utilTip.toThousands(res.data.content.sog_price),
            sog_total: utilTip.toThousands(res.data.content.sog_total),
            sog_finishednum: res.data.content.sog_finishednum,
            in_num: res.data.content.in_num,
            ex_num: res.data.content.ex_num,
            store_num: res.data.content.store_num,
            sog_spec: res.data.content.sog_spec,
            packagedemand: res.data.content.packagedemand,
            paperstyle: res.data.content.paperstyle,
            sog_makeup_num: res.data.content.sog_makeup_num,
            mould: res.data.content.mould,
            stamping: res.data.content.stamping,
            printdemand: res.data.content.printdemand,
            sog_requirements: res.data.content.sog_requirements,
            sog_content: res.data.content.sog_content,
            orderPurchase: res.data.content.orderPurchase,
            salesorderProcess: res.data.content.salesorderProcess,
            imageList: res.data.content.imageList,
            mobileByInput: res.data.content.mobileByInput,
            mobileByExport: res.data.content.mobileByExport,
            sog_aduitstatus: res.data.content.sog_aduitstatus
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
  auditEv: function(event){
    var that = this;
    if(that.data.sog_aduitstatus == '审核'){
      wx.request({
        url: app.globalData.appUrl + '/api/manufactureOrder/auditManufactureOrder?access_token=' + app.globalData.accessToken,
        data: { sog_id: that.data.sog_id },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
            mask: true
          })
          that.onLoad(that.data.paramsId);
        }
      })
    }else if(that.data.sog_aduitstatus == '反审'){
      wx.request({
        url: app.globalData.appUrl + '/api/manufactureOrder/oppositeAuditManufacture?access_token=' + app.globalData.accessToken,
        data: { sog_id: that.data.sog_id },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000,
            mask: true
          })
          that.onLoad(that.data.paramsId);
        }
      })
    }
  },
  dispatchEv : function(event) {
    var that = this;
    wx.request({
      url: app.globalData.appUrl + '/api/manufactureOrder/dispatchManufactureOrder?access_token=' + app.globalData.accessToken,
      data: { sog_id: that.data.sog_id },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  completeEv : function(event) {
    var that = this;
    wx.request({
      url: app.globalData.appUrl + '/api/manufactureOrder/finishManufacture?access_token=' + app.globalData.accessToken,
      data: { sog_id: that.data.sog_id },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  }
})
