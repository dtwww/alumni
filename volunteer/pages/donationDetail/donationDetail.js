const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    detail: null,
    swiperImgs: null,
    showInputModal: false,
    inputMoney: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    var that = this
    //调用donation接口，根据id返回某活动信息
    wx.request({
      url: 'http://127.0.0.1:5000/donation?id=' + that.data.id,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        that.setData({
          detail: res.data,
          swiperImgs: [
            res.data.picture1,
            res.data.picture2,
            res.data.picture3
          ]
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
    // if (app.globalData.completeUserInfo.name != "" && app.globalData.completeUserInfo.id != "" && app.globalData.completeUserInfo.phone != "") {
    //   this.setData({
    //     userInfoComplete: true
    //   })
    // } else {
    //   this.setData({
    //     userInfoComplete: false
    //   })
    // }
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

  //查看捐款详情点击事件
  userDonationDetail: function (e) {
    wx.navigateTo({
      url: '../userDonationDetail/userDonationDetail?id=' + e.currentTarget.dataset.id,
    })
  }

})