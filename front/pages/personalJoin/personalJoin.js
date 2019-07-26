import { getEntity } from '../../utils/api.js'

var app = getApp()

// pages/personalJoin/personalJoin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityArray: null,
    // unverifiedArray: [],
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
      // var unverifiedTemp = []
      for (var i = 0; i < this.data.activityArray.length; i++) {
        // if (this.data.activityArray[i].create_nickname == app.globalData.userInfo.nickName && this.data.activityArray[i].status == 0) { //未审核
        //   unverifiedTemp.push(this.data.activityArray[i])
        // }
        if (this.data.activityArray[i].create_nickname == app.globalData.userInfo.nickName && this.data.activityArray[i].status == 1) { //已审核
          verifiedTemp.push(this.data.activityArray[i])
        }
      }
      this.setData({
        verifiedArray: verifiedTemp,
        // unverifiedArray: unverifiedTemp
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

  //查看活动详情点击事件
  detail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '../staticActivityDetail/staticActivityDetail?id=' + e.currentTarget.dataset.id + '&type=noJoin',
    })
  },

    //我加入的 未发布 长按删除
  unverifiedLongPress: function (e) {

  },

  //我加入的 已发布 长按删除
  verifiedLongPress: function (e) {

  },
})