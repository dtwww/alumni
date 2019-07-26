const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    donationArray: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用userDonation接口返回用户-捐款类活动信息
    wx.request({
      url: 'http://127.0.0.1:5000/userDonation?nickname=' + app.globalData.userInfo.nickName,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        that.setData({
          donationArray: res.data.list
        })
        //console.log(that.data.donationArray)
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

  }
})