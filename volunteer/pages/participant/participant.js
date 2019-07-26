// pages/participant/participant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityId: null,
    createNickname: null,
    createName: null,
    userJoinActivityArray: null,
    userArray: null,
    joinArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options)
    this.setData({
      activityId: options.id,
    })
    //console.log(this.data.activityId)
    var that = this
    //获取该活动创建人昵称
    wx.request({
      url: 'http://127.0.0.1:5000/activity?id=' + that.data.activityId,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.setData({
          createNickname: res.data.create_nickname
        })
        //获取活动创建人姓名
        wx.request({
          url: 'http://127.0.0.1:5000/user?nickname=' + that.data.createNickname,
          method: 'GET',
          header: {
            'content-type': 'json'
          },
          success(res) {
            that.setData({
              createName: res.data.name
            })
          }
        })
      }
    })
    //查看该活动参与情况
    wx.request({
      url: 'http://127.0.0.1:5000/userJoinActivity?activity_id=' + that.data.activityId,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.setData({
          userJoinActivityArray: res.data.list
        })
        //有参与者
        if (that.data.userJoinActivityArray.length != 0) {
          //获取所有用户信息
          wx.request({
            url: 'http://127.0.0.1:5000/user',
            method: 'GET',
            header: {
              'content-type': 'json'
            },
            success(res) {
              that.setData({
                userArray: res.data.list
              })
              var tempArray = []
              for (var i = 0; i < that.data.userJoinActivityArray.length; i++)
                for (var j = 0; j < that.data.userArray.length; j++) {
                  if (that.data.userJoinActivityArray[i].nickname == that.data.userArray[j].nickname) {
                    tempArray.push({
                      nickname: that.data.userArray[j].nickname,
                      name: that.data.userArray[j].name
                    })
                  }
                }
              that.setData({
                joinArray: tempArray //参与者昵称和姓名
              })
              //console.log(that.data.joinArray)
            }
          })
        }
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