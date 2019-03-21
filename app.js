App({
  globalData:{
    domainUrl: 'https://sysapi.lihongda.cn',
    appUrl: 'https://sysapi.lihongda.cn',
    accessToken: ''
  },
  // globalData: {
  //   domainUrl: 'http://oa.ea-mall.com:51888/LiHongDa',
  //   appUrl: 'http://oa.ea-mall.com:51888/LiHongDa',
  //   accessToken: ''
  // },
  //调用登录接口
    //1.小程序调用wx.login得到code.
  getUserInfo: function() {
    var that = this
    wx.login({
      success: function (res) {
        var code = res['code'];
        wx.request({
	      url: that.globalData.appUrl + '/weixinLogin?code=' + code,
	      method: 'POST',
	      header:{
	        'content-type': 'application/json'
	      },
	      success: function(res) {
	        if (res.data.access_token != undefined) {
	            that.globalData.accessToken = res.data.access_token;
	            wx.showToast({
	              title: '登录成功',
	              icon: 'success',
	              duration: 1000,
	              mask: true
	            })
	            setTimeout(function () {
	              wx.navigateTo({
	                url: '../mine/mine'
	              })
	            }, 1500)
	        }
	      }
	    });
      }
    });
  }
})
