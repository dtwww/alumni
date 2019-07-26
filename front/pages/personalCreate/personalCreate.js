import { getEntity } from '../../utils/api.js'

var app = getApp()

// pages/personalCreate/personalCreate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityArray: null,
    unverifiedArray: [],
    verifiedArray: [],
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
    //调用activity接口，返回某活动列表信息
    getEntity('activity').then(res => {
      this.setData({
        activityArray: res.data.list,
      })
      var verifiedTemp = []
      var unverifiedTemp = []
      for (var i = 0; i < this.data.activityArray.length; i++) {
        if (this.data.activityArray[i].create_nickname == app.globalData.userInfo.nickName && this.data.activityArray[i].status == 0) { //未发布
          unverifiedTemp.push(this.data.activityArray[i])
        } else if (this.data.activityArray[i].create_nickname == app.globalData.userInfo.nickName && this.data.activityArray[i].status == 1) { //已发布
          verifiedTemp.push(this.data.activityArray[i])
        }
      }
      this.setData({
        verifiedArray: verifiedTemp,
        unverifiedArray: unverifiedTemp
      })
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

  //查看未发布活动详情点击事件
  unverifiedDetail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '../userCreateUnverified/userCreateUnverified?id=' + e.currentTarget.dataset.id,
    })
  },

  //查看已发布活动详情点击事件
  verifiedDetail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '../staticActivityDetail/staticActivityDetail?id=' + e.currentTarget.dataset.id + '&type=noJoin',
    })
  },

  //我创建的 未发布 长按删除
  unverifiedLongPress: function(e) {

  },

  //我创建的 已发布 长按删除
  verifiedLongPress: function (e) {

  },


})