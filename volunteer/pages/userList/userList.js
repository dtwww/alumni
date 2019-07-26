// pages/userList/userList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userArray: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用user接口，返回所有用户信息
    wx.request({
      url: 'http://127.0.0.1:5000/user',
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        that.setData({
          userArray: res.data.list
        })
      }
    })
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

  //每一项点击事件
  userDetail: function (e) {
    wx.navigateTo({
      url: '../userInfo/userInfo?nickname=' + e.currentTarget.dataset.nickname,
    })
  },
})