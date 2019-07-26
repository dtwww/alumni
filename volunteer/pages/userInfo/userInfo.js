// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: null,
    userDetail: null,
    userCreateArray: null,
    userJoinArray: null,
    activityArray: null,
    nameArray: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      nickname: options.nickname
    })
    var that = this
    //调用user接口，根据nickname返回信息
    wx.request({
      url: 'http://127.0.0.1:5000/user?nickname=' + that.data.nickname,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function(res) {
        that.setData({
          userDetail: res.data
        })
      }
    })
    //调用activity接口，根据nickname返回该用户创建的所有活动
    wx.request({
      url: 'http://127.0.0.1:5000/activity?create_nickname=' + that.data.nickname,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function(res) {
        that.setData({
          userCreateArray: res.data.list
        })
      }
    })
    //调用userJoinAtivity接口，根据nickname返回该用户加入的所有活动
    wx.request({
      url: 'http://127.0.0.1:5000/userJoinActivity?nickname=' + that.data.nickname,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function(res) {
        that.setData({
          userJoinArray: res.data.list
        })
        //console.log(that.data.userJoinArray)
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
            var tempArray = []
            for (var i = 0; i < that.data.userJoinArray.length; i++)
              for (var j = 0; j < that.data.activityArray.length; j++) {
                if (that.data.userJoinArray[i].activity_id == that.data.activityArray[j].id) {
                  tempArray.push(that.data.activityArray[j].name)
                  break
                }
              }
            that.setData({
              nameArray: tempArray
            })
          }
        })
      }
    })
    //调用userDonation接口，根据nickname返回该用户参与的所有捐款活动
    wx.request({
      url: 'http://127.0.0.1:5000/userDonation?nickname=' + that.data.nickname,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function(res) {
        that.setData({
          userDonationArray: res.data.list
        })
      }
    })
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

  }
})