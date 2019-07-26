const app = getApp()

// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    //console.log(this.userInfo)
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
    //console.log(this.data.userInfo)
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

  //点击个人信息
  personalInfo: function (e) {
    wx.navigateTo({
      url: '../personalInfo/personalInfo',
    })
  },

  //点击我创建的
  personalCreate: function (e) {
    wx.navigateTo({
      url: '../personalCreate/personalCreate',
    })
  },

  //点击我加入的
  personalJoin: function (e) {
    wx.navigateTo({
      url: '../personalJoin/personalJoin',
    })
  },

  //点击捐款活动
  personalDonation: function (e) {
    wx.navigateTo({
      url: '../personalDonation/personalDonation',
    })
  }
})