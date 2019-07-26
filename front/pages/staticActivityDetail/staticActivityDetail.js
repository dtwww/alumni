// pages/staticActivityDetail/staticActivityDetail.js
var app = getApp()
import {
  getEntity,
  getUserActivities,
  joinActivity
} from '../../utils/api.js'
import {
  enrolmentOptions
} from '../../utils/appConfig.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: null,
    detailId: null,
    activity: null,
    id: null,
    name: null,
    people: null,
    enrolmentYear: null,
    departmentName: null,
    classNumber: null,
    hotelId: null,
    hotelPeople: null,
    hotelDay: null,
    activityModelId: null,
    createNickName: null,
    time1: null,
    activity1: null,
    time2: null,
    activity2: null,
    time3: null,
    activity3: null,
    photoId: null,
    elseNeed: null,
    status: null,

    hotelName: null,
    activityModelName: null,
    photoName: null,
    souvenirNameArray: null,
    activitySouvenirArray: null,

    souvenirIdArray: null,
    souvenirAmountArray: null,
    souvenirNameAmountArray: null,

    activityTypeOptions: [{
      display: '不需密码',
      name: 'non-password'
    }, {
      display: '需要密码',
      name: 'password'
    }],
    activityType: 'non-password',
    enrolmentOptions,

    enrolment: null,
    department: null,


    userJoinActivityArray: null,
    userInActivity: false,
    userCreateActivity: false,
    unVerifiedActivity: false,
    showJoinActivityModal: false,
    password: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type,
      detailId: options.id,
    })

    var that = this
    //调用activity接口，根据id返回某活动信息
    getEntity('activity', this.data.detailId).then(res => {
      that.setData({
        activity: res.data
      })
      //console.log(that.data.activity)
      that.setData({
        id: that.data.activity.id,
        name: that.data.activity.name,
        people: that.data.activity.people,
        hotelId: that.data.activity.hotel_id,
        hotelPeople: that.data.activity.hotel_people,
        hotelDay: that.data.activity.hotel_day,
        activityModelId: that.data.activity.activity_model_id,
        createNickName: that.data.activity.create_nickname,
        time1: that.data.activity.time1,
        activity1: that.data.activity.activity1,
        time2: that.data.activity.time2,
        activity2: that.data.activity.activity2,
        time3: that.data.activity.time3,
        activity3: that.data.activity.activity3,
        photoId: that.data.activity.photo_id,
        elseNeed: that.data.activity.else_need,
        status: that.data.activity.status,
        enrolmentYear: that.data.activity.enrolment_year,
        departmentName: that.data.activity.department,
        classNumber: that.data.activity.class_number,
        activityType: that.data.activity.activity_type,
      })
      for (var i = 0; i < enrolmentOptions.length; i++) {
        if (enrolmentOptions[i].year == that.data.enrolmentYear) {
          that.setData({
            enrolment: enrolmentOptions[i]
          })
          for (var j = 0; j < that.data.enrolment.departments.length; j++) {
            if (that.data.enrolment.departments[j].name == that.data.departmentName) {
              that.setData({
                department: that.data.enrolment.departments[j]
              })
              break
            }
          }
          break
        }
      }
      //console.log(that.data.name)
      //调用宾馆接口，返回宾馆名称
      wx.request({
        url: 'http://127.0.0.1:5000/hotel?id=' + that.data.hotelId,
        method: 'GET',
        header: {
          'content-type': 'json' // 默认值
        },
        success: function(res) {
          that.setData({
            hotelName: res.data.name
          })
        }
      })
      //判断该活动是否有模板
      if (that.data.activityModelId != null) {
        //调用活动模板接口，返回活动模板名称
        wx.request({
          url: 'http://127.0.0.1:5000/activityModel?id=' + that.data.activityModelId,
          method: 'GET',
          header: {
            'content-type': 'json' // 默认值
          },
          success: function(res) {
            that.setData({
              activityModelName: res.data.name
            })
          }
        })
      }
      //判断该活动是否有摄影需求
      if (that.data.photoId != null) {
        //调用摄影接口，返回摄影名称
        wx.request({
          url: 'http://127.0.0.1:5000/photo?id=' + that.data.photoId,
          method: 'GET',
          header: {
            'content-type': 'json' // 默认值
          },
          success: function(res) {
            that.setData({
              photoName: res.data.name
            })
          }
        })
      }
      //调用纪念品接口，返回纪念品名称和数量
      wx.request({
        url: 'http://127.0.0.1:5000/activitySouvenir?id=&activity_id=' + that.data.id,
        method: 'GET',
        header: {
          'content-type': 'json' // 默认值
        },
        success: function(res) {
          that.setData({
            activitySouvenirArray: res.data.list
          })
          //console.log(res.data.list)
          //console.log(that.data.activitySouvenirArray.length)
          //若该活动有纪念品，调用souvenir接口查询纪念品详情
          if (that.data.activitySouvenirArray.length != 0 && that.data.activitySouvenirArray[0].souvenir_id != null) {
            // if (that.data.activitySouvenirArray.length != 0){
            //console.log('aaa')
            var tempStringIdArray = that.data.activitySouvenirArray[0].souvenir_id.split(",")
            var tempStringAmountArray = that.data.activitySouvenirArray[0].amount.split(",")
            // console.log(tempStringIdArray)
            // console.log(tempStringAmountArray)
            var tempArray = []
            var tempIdArray = []
            var tempAmountArray = []
            var j = 0
            for (var i = 0; i < tempStringIdArray.length; i++) {
              tempIdArray.push(parseInt(tempStringIdArray[i]))
              tempAmountArray.push(parseInt(tempStringAmountArray[i]))
              //console.log(tempAmountArray)
              wx.request({
                url: 'http://127.0.0.1:5000/souvenir?id=' + tempStringIdArray[i],
                method: 'GET',
                header: {
                  'content-type': 'json' // 默认值
                },
                success: function(res) {
                  tempArray.push({
                    name: res.data.name,
                    amount: tempAmountArray[j]
                  })
                  j++
                  that.setData({
                    souvenirNameAmountArray: tempArray
                  })
                  //console.log(that.data.souvenirNameAmountArray)
                }
              })
            }
            that.setData({
              souvenirIdArray: tempIdArray,
              souvenirAmountArray: tempAmountArray
            })
            //console.log(that.data.souvenirIdArray)
          }

        }
      })
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

  //加入活动按钮点击事件
  join: function(e) {
    //不需密码
    if (this.data.activityType == 'non-password') {
      if (app.globalData.completeUserInfo.name == '' || app.globalData.completeUserInfo.enrolmentYear == '' || app.globalData.completeUserInfo.department == '' || app.globalData.completeUserInfo.classNumber == '' || app.globalData.completeUserInfo.contact == '') {
        wx.navigateTo({
          url: '../personalInfo/personalInfo',
        })
        wx.showToast({
          title: '请完善个人信息！',
          image: '../../images/icons/error.png'
        })
      } else if (this.data.createNickName == app.globalData.userInfo.nickName) {
        this.setData({
          userCreateActivity: true
        })
        wx.showToast({
          title: '您是创建者！',
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
            if (this.data.detailId == this.data.userJoinActivityArray[i].activity_id) {
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
          //若该用户未加入该活动&不是该活动的创建者&活动审核通过
          if (!this.data.userInActivity && !this.data.userCreateActivity && !this.data.unVerifiedActivity) {
            //将该用户加入该活动
            joinActivity({
              nickname: app.globalData.userInfo.nickName,
              activity_id: this.data.detailId
            }).then(res => {
              wx.navigateBack({
                delta: 1
              })
              wx.showToast({
                title: '加入成功！'
              })
            })
          }
        })
        this.setData({
          userCreateActivity: false,
          userInActivity: false,
          unVerifiedActivity: false
        })
      }
    } else { //需要密码
      this.setData({
        showJoinActivityModal: true
      })
    }
  },

  //监听活动密码输入
  inputChange: function (e) {
    //console.log(e)
    this.setData({
      password: e.detail.value
    })
  },

  //确定输入活动密码（加入活动）
  yesInput: function (e) {
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
    } else if (this.data.password != this.data.detailId) { //输入密码错误
      wx.showToast({
        title: '密码错误！',
        image: '../../images/icons/error.png'
      })
    } else if (this.data.createNickName == app.globalData.userInfo.nickName) {
      this.setData({
        userCreateActivity: true
      })
      wx.showToast({
        title: '您是创建者！',
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
          if (this.data.detailId == this.data.userJoinActivityArray[i].activity_id) {
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
        //若该用户未加入该活动&不是该活动的创建者&活动审核通过
        if (!this.data.userInActivity && !this.data.userCreateActivity && !this.data.unVerifiedActivity) {
          //将该用户加入该活动
          joinActivity({
            nickname: app.globalData.userInfo.nickName,
            activity_id: this.data.detailId
          }).then(res => {
            this.setData({
              showJoinActivityModal: false
            })
            wx.navigateBack({
              delta: 1
            })
            wx.showToast({
              title: '加入成功！'
            })
          })
        }
      })
      this.setData({
        userCreateActivity: false,
        userInActivity: false,
        unVerifiedActivity: false
      })
    }
  },

  //取消输入活动密码
  noInput: function (e) {
    this.setData({
      showJoinActivityModal: false
    })
  },
})