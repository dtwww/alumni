// pages/photoDetail/photoDetail.js

import { getEntity } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    swiperImgs: null,
    detail: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    //console.log(options)
    var that = this
    getEntity('photo', this.data.id).then(res => {
      that.setData({
        detail: res.data
      })
      const { picture1, picture2, picture3 } = that.data.detail
      that.setData({
        swiperImgs: [picture1, picture2, picture3]
      })
      //console.log(that.data.swiperImgs)
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