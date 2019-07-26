// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUnverifiedActivity: false,
    activityArray: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      hasUnverifiedActivity: false
    })
    //查看是否有未审核活动
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/activity',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.setData({
          activityArray: res.data.list
        })
        for (var i = 0; i < that.data.activityArray.length; i++) {
          if (that.data.activityArray[i].status == 0) {
            that.setData({
              hasUnverifiedActivity: true
            })
            break
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //未审核活动列表按钮点击事件
  unverifiedActivityList: function () {
    wx.navigateTo({
      url: '../unverifiedActivityList/unverifiedActivityList',
    })
  },

  //已审核活动列表按钮点击事件
  verifiedActivityList: function () {
    wx.navigateTo({
      url: '../verifiedActivityList/verifiedActivityList',
    })
  },

  //捐款活动列表按钮点击事件
  donationList: function (e) {
    wx.navigateTo({
      url: '../donationList/donationList',
    })
  }
})