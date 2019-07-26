/*
志愿者端
审核活动
捐款活动
与我相关
*/

import {
  getEntity,
  getUserByNickname,
  saveUser,
  joinActivity,
  getUserActivities
} from '../../utils/api'
const app = getApp()

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgs: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560403209713&di=339b8c4884ccbc13971b83ca5b48766e&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171206%2Faf361c9a4fe645f080a4ff91d7e6633e.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560403209711&di=d9a3f3421fe8cd5f8250f2734d45bcaf&imgtype=0&src=http%3A%2F%2Fwww.goodedus.com%2Fupfile%2Feditor%2F201803%2F20180306162357_temp_77393.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560403209711&di=7ea0f8161f2fa70913e15cefd42854e6&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170726%2F77445a1cbd5a452db9891fc696a4e158_th.png'
    ],
    userInfo: null,
    hasUserInfo: null,
    sexArray: {
      0: "无",
      1: "男",
      2: "女"
    },
    countryArray: {
      "China": "中国"
    },
    provinceArray: {
      "China": {
        "Liaoning": "辽宁"
      }
    },
    cityArray: {
      "China": {
        "Liaoning": {
          "Chaoyang": "朝阳"
        }
      }
    },
    password: null,
    userCreateActivity: null,
    activityArray: null,
    activityExist: false,
    userInActivity: false,
    unVerifiedActivity: false,
    userJoinActivityArray: null,
    showJoinActivityModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) { //有全局用户信息
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else { //没有全局用户信息
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.showLoading({
      title: 'Loading...',
    })
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.hideLoading()
        //console.log(app.globalData.userInfo)
        // app.globalData.completeUserInfo.name = '董婷文',
        // app.globalData.completeUserInfo.id = '123456789123456789',
        // app.globalData.completeUserInfo.phone = '17863110180'
        //调用user接口添加用户或返回用户信息
        getUserByNickname(this.data.userInfo.nickName).then(res => {
          app.globalData.completeUserInfo.name = res.data.name
          app.globalData.completeUserInfo.sex = res.data.sex
          app.globalData.completeUserInfo.enrolmentYear = res.data.enrolmentYear
          app.globalData.completeUserInfo.department = res.data.department
          app.globalData.completeUserInfo.classNumber = res.data.classNumber
          app.globalData.completeUserInfo.contact = res.data.contact
          //修改user
          saveUser(this.data.userInfo.nickName, {
            sex: this.data.sexArray[app.globalData.userInfo.gender],
          }).then(res => {
            app.globalData.completeUserInfo.sex = this.data.sexArray[app.globalData.userInfo.gender]
            //console.log(this.data.sexArray[app.globalData.userInfo.gender])
          })
        })
      },
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

  },

  //点击创建活动
  createActivity: function(e) {
    wx.navigateTo({
      url: '../createActivity/createActivity',
    })
  },

  //点击加入活动
  joinActivity: function(e) {
    this.setData({
      showJoinActivityModal: true
    })
  },

  // 点击与我相关
  showActivities: function(e) {
    wx.navigateTo({
      url: '../activityList/activityList',
    })
  },

  //点击随便逛逛
  wander: function(e) {
    wx.navigateTo({
      url: '../wanderList/wanderList',
    })
  },

  //点击联系我们
  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: '17863110180',
    })
  },

  //监听活动密码输入
  inputChange: function(e) {
    //console.log(e)
    this.setData({
      password: e.detail.value
    })
  },

  //确定输入活动密码（加入活动）
  yesInput: function(e) {
    if (app.globalData.completeUserInfo.name == '' || app.globalData.completeUserInfo.enrolmentYear == '' || app.globalData.completeUserInfo.department == '' || app.globalData.completeUserInfo.classNumber == '' || app.globalData.completeUserInfo.contact == '') {
      this.setData({
        showJoinActivityModal: false
      })
      wx.navigateTo({
        url: '../personalInfo/personalInfo',
      })
      wx.showToast({
        title: '请完善个人信息！',
        image: '../../images/icons/error.png'
      })
    } else {
      //调用userJoinActivity接口返回信息
      getUserActivities(app.globalData.userInfo.nickName).then(res => {
        this.setData({
          userJoinActivityArray: res.data.list
        })
        for (var i = 0; i < this.data.userJoinActivityArray.length; i++) {
          //若该用户已经加入该活动
          if (this.data.password == this.data.userJoinActivityArray[i].activity_id) {
            this.setData({
              userInActivity: true
            })
            wx.showToast({
              title: '您已在活动中！',
              image: '../../images/icons/error.png'
            })
            break
          }
        }
        getEntity('activity').then(res => {
          this.setData({
            activityArray: res.data.list
          })
          for (var i = 0; i < this.data.activityArray.length; i++) {
            if (app.globalData.userInfo.nickName == this.data.activityArray[i].create_nickname && this.data.password == this.data.activityArray[i].id) {
              this.setData({
                userCreateActivity: true
              })
              wx.showToast({
                title: '您是创建者！',
                image: '../../images/icons/error.png'
              })
            }
            if (this.data.password == this.data.activityArray[i].id && this.data.activityArray[i].status == 0) {
              this.setData({
                unVerifiedActivity: true
              })
              wx.showToast({
                title: '该活动未审核！',
                image: '../../images/icons/error.png'
              })
            }
          }
          //判断该活动是否存在
          for (var i = 0; i < this.data.activityArray.length; i++) {
            if (this.data.password == this.data.activityArray[i].id) {
              this.setData({
                activityExist: true
              })
              break
            }
          }
          //若该用户未加入该活动&不是该活动的创建者&活动审核通过&活动存在
          if (!this.data.userInActivity && !this.data.userCreateActivity && !this.data.unVerifiedActivity && this.data.activityExist) {
            //将该用户加入该活动
            joinActivity({
              nickname: app.globalData.userInfo.nickName,
              activity_id: this.data.password
            }).then(res => {
              wx.showToast({
                title: '加入成功！'
              })
              this.setData({
                showJoinActivityModal: false
              })
            })
          } else if (!this.data.activityExist) {
            wx.showToast({
              title: '活动不存在！',
              image: '../../images/icons/error.png'
            })
          }
        })
      })

      this.setData({
        activityExist: false,
        userCreateActivity: false,
        userInActivity: false,
        unVerifiedActivity: false
      })
    }
  },

  //取消输入活动密码
  noInput: function(e) {
    this.setData({
      showJoinActivityModal: false
    })
  },

  //点击我要捐款
  donation: function (e) {
    wx.navigateTo({
      url: '../donationList/donationList',
    })
  }
})