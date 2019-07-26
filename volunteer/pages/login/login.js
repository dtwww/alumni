// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    info: null
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

  //用户名输入监听事件
  usernameChange: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  //密码输入监听事件
  passwordChange: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  //登录按钮点击事件
  login: function (e) {
    var that = this
    //调用volunteer接口返回志愿者信息
    wx.request({
      url: 'http://127.0.0.1:5000/volunteer?username=' + this.data.username,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        that.setData({
          info: res.data
        })
        //console.log(that.data.info.username)
        //不存在该用户名
        if (that.data.info.username == '') {
          wx.showToast({
            title: '用户名不存在！',
            image: '../../images/icons/error.png',
            duration: 2500
          })
        } else {
          //密码不正确
          if (that.data.info.password != that.data.password) {
            wx.showToast({
              title: '密码错误！',
              image: '../../images/icons/error.png',
              duration: 2500
            })
          } else {
            wx.switchTab({
              url: '../home/home',
            })
            wx.showToast({
              title: '登录成功！'
            })
          }
        }
      }
    })
  }
})