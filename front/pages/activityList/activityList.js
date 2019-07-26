import {
  findActivities
} from '../../utils/api.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityArray: null,
    findArray: null,
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
    var that = this
    //调用activity接口，返回所有活动
    wx.request({
      url: 'http://127.0.0.1:5000/activity',
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function(res) {
        that.setData({
          activityArray: res.data.list
        })
        //console.log(that.data.activityArray)
        var tempArray = []
        //获得活动列表中与该用户入学年份、专业和班级一样的已审核的活动
        for (var i = 0; i < that.data.activityArray.length; i++) {
          if (that.data.activityArray[i].enrolment_year == app.globalData.completeUserInfo.enrolmentYear && that.data.activityArray[i].department == app.globalData.completeUserInfo.department && that.data.activityArray[i].class_number == app.globalData.completeUserInfo.classNumber && that.data.activityArray[i].status == 1) {
            tempArray.push(that.data.activityArray[i])
          }
        }
        that.setData({
          findArray: tempArray
        })
        //console.log(that.data.findArray)
      }
    })
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

  //查看活动详情
  detail: function (e) {
    wx.navigateTo({
      url: '../staticActivityDetail/staticActivityDetail?id=' + e.currentTarget.dataset.id + '&type=join',
    })
  }
})