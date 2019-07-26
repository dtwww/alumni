// pages/photoChoose/photoChoose.js
import { getEntity } from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoArray: null,
    photoId: null,
    photoName: null,
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
    //返回摄影列表
    getEntity('photo').then(res => this.setData({
      photoArray: res.data.list
    }))
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

  //搜索框变化触发事件
  inputChange: function (e) {

  },

  //摄影详情点击事件
  photoDetail: function (e) {
    wx.navigateTo({
      url: '../photoDetail/photoDetail?id=' + e.currentTarget.dataset.id
    })
  },

  //单选框变化事件
  radioChange: function (e) {
    //console.log(e.detail);
    this.setData({
      photoId: e.detail.value,
    })
  },

  //确定按钮点击事件
  yes: function (e) {
    if (this.data.photoId != null) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        photoId: this.data.photoId,
        photoName: this.data.photoArray[this.data.photoId - 1].name,
      })
    }
    wx.navigateBack({ //返回
      delta: 1
    })
  }
})
