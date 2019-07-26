// pages/activityList/activityList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityArray: null,
    verifiedActivityArray: null,
    showDeleteModal: false,
    deleteId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/activity',
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.setData({
          activityArray: res.data.list
        })
        var tempArray = []
        for(var i=0; i<that.data.activityArray.length;i++){
          if(that.data.activityArray[i].status == 1){
            tempArray.push(that.data.activityArray[i])
          }
        }
        that.setData({
          verifiedActivityArray: tempArray
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

  //活动详情点击事件
  activityDetail: function(e) {
    wx.navigateTo({
      url: '../verifiedActivityDetail/verifiedActivityDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  //长按删除事件
  delete: function (e) {
    this.setData({
      showDeleteModal: true,
      deleteId: e.currentTarget.dataset.id
    })
  },

  //确定删除
  yesDelete: function (e) {
    var that = this
    //删除一项activity
    wx.request({
      url: 'http://127.0.0.1:5000/activity?id=' + that.data.deleteId,
      method: 'DELETE',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        //删除所有userJoinActvity
        wx.request({
          url: 'http://127.0.0.1:5000/userJoinActivity?activity_id=' + that.data.deleteId,
          method: 'DELETE',
          header: {
            'content-type': 'json' // 默认值
          },
          success: function (res) {
            //删除一项actvitySouvenir
            wx.request({
              url: 'http://127.0.0.1:5000/activitySouvenir?activity_id=' + that.data.deleteId,
              method: 'DELETE',
              header: {
                'content-type': 'json' // 默认值
              },
              success: function (res) {
                //更新活动列表
                wx.request({
                  url: 'http://127.0.0.1:5000/activity',
                  method: 'GET',
                  header: {
                    'content-type': 'json'
                  },
                  success(res) {
                    that.setData({
                      activityArray: res.data.list
                    })
                    var tempArray = []
                    for (var i = 0; i < that.data.activityArray.length; i++) {
                      if (that.data.activityArray[i].status == 1) {
                        tempArray.push(that.data.activityArray[i])
                      }
                    }
                    that.setData({
                      verifiedActivityArray: tempArray
                    })
                    that.setData({
                      showDeleteModal: false
                    })
                    wx.showToast({
                      title: '删除成功！',
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  //取消删除
  noDelete: function (e) {
    this.setData({
      showDeleteModal: false
    })
  }
})