// pages/activityChoose/activityChoose.js
import { getEntity } from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityModelArray: null,
    activityModelId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    //返回活动模板列表
    getEntity('activityModel').then(res =>
      that.setData({
        activityModelArray: res.data.list
      })
    );
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  //单选框变化事件
  radioChange: function(e) {
    //console.log(e.detail);
    this.setData({
      activityModelId: e.detail.value
    });
  },

  //确定按钮点击事件
  yes: function(e) {
    if (this.data.activityModelId != null) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        activityModelId: this.data.activityModelId,
        activityModelName: this.data.activityModelArray[
          this.data.activityModelId - 1
        ].name,
        time1: this.data.activityModelArray[this.data.activityModelId - 1]
          .time1,
        activity1: this.data.activityModelArray[this.data.activityModelId - 1]
          .activity1,
        time2: this.data.activityModelArray[this.data.activityModelId - 1]
          .time2,
        activity2: this.data.activityModelArray[this.data.activityModelId - 1]
          .activity2,
        time3: this.data.activityModelArray[this.data.activityModelId - 1]
          .time3,
        activity3: this.data.activityModelArray[this.data.activityModelId - 1]
          .activity3
      });
    }
    wx.navigateBack({
      //返回
      delta: 1
    });
  }
});
