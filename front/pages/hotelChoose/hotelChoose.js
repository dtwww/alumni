// pages/hotelChoose/hotelChoose.js

import { getEntity } from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelArray: null,
    hotelId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //返回宾馆列表
    getEntity('hotel').then(res => this.setData({
      hotelArray: res.data.list
    }))
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //搜索框变化触发事件
  inputChange: function(e) {

  },

  //宾馆详情点击事件
  hotelDetail: function(e) {
    wx.navigateTo({
      url: '../hotelDetail/hotelDetail?id=' + e.currentTarget.dataset.id
    })
  },

  //单选框变化事件
  radioChange: function(e) {
    //console.log(e.detail.value);
    this.setData({
      hotelId: e.detail.value,
    })
  },

  //确定按钮点击事件
  yes: function(e) {
    if (this.data.hotelId != null) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        hotelId: this.data.hotelId,
        hotelName: this.data.hotelArray[this.data.hotelId - 1].name,
      })
    }
    wx.navigateBack({ //返回
      delta: 1
    })
  }
})
