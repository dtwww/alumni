import {
  createActivity
} from '../../utils/api.js'
import {
  enrolmentOptions
} from '../../utils/appConfig.js'

var app = getApp()

// pages/createActivity/createActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    people: null,
    enrolmentYear: null,
    department: null,
    classNumber: null,
    hotelPeople: null,
    hotelDay: null,
    createNickName: null,
    elseNeed: null,
    status: null,

    hotelId: null,
    hotelName: null,
    activityModelId: null,
    activityModelName: null,
    time1: null,
    activity1: null,
    time2: null,
    activity2: null,
    time3: null,
    activity3: null,
    photoId: null,
    photoName: null,
    souvenirIdArray: null,
    souvenirNameArray: null,

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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    this.setData({
      hotelId: currPage.data.hotelId,
      hotelName: currPage.data.hotelName,
      activityModelId: currPage.data.activityModelId,
      activityModelName: currPage.data.activityModelName,
      time1: currPage.data.time1,
      activity1: currPage.data.activity1,
      time2: currPage.data.time2,
      activity2: currPage.data.activity2,
      time3: currPage.data.time3,
      activity3: currPage.data.activity3,
      photoId: currPage.data.photoId,
      photoName: currPage.data.photoName,
      souvenirIdArray: currPage.data.souvenirIdArray,
      souvenirNameArray: currPage.data.souvenirNameArray,
      souvenirNameAmountArray: currPage.data.souvenirNameAmountArray,
      // enrolment: currPage.data.enrolment,
      // department: currPage.data.department,
      // classNumber: currPage.data.classNumber
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

  //姓名输入事件
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  //人数输入事件
  peopleInput: function(e) {
    this.setData({
      people: e.detail.value
    })
  },

  //选择活动类型
  onActivityTypeChange: function (e) {
    this.setData({
      activityType: e.detail.value
    })
  },

  //选择入学年份
  onSelectEnrolmentYear: function (e) {
    const index = e.detail.value
    this.setData({
      enrolment: enrolmentOptions[index],
      department: null,
      classNumber: null
    })
  },

  //选择专业
  onSelectDepartment: function (e) {
    const index = e.detail.value
    if (this.data.enrolment) {
      this.setData({
        department: this.data.enrolment.departments[index],
        classNumber: null
      })
    }
  },

  //选择班级
  onSelectClassNumber: function (e) {
    const index = e.detail.value
    if (this.data.department) {
      this.setData({
        classNumber: this.data.department.classes[index]
      })
    }
  },

  // //专业输入事件
  // majorInput: function(e) {
  //   this.setData({
  //     major: e.detail.value
  //   })
  // },

  // //毕业年份输入事件
  // graduateInput: function(e) {
  //   this.setData({
  //     graduate: e.detail.value
  //   })
  // },

  //宾馆选择点击事件
  hotelChoose: function(e) {
    wx.navigateTo({
      url: '../hotelChoose/hotelChoose',
    })
  },

  //居住人数输入事件
  hotelPeopleInput: function(e) {
    this.setData({
      hotelPeople: e.detail.value
    })
  },

  //居住天数输入事件
  hotelDayInput: function(e) {
    this.setData({
      hotelDay: e.detail.value
    })
  },

  //活动模板选择点击事件
  activityChoose: function(e) {
    wx.navigateTo({
      url: '../activityChoose/activityChoose',
    })
  },

  //时间1输入事件
  timeInput1: function(e) {
    this.setData({
      time1: e.detail.value
    })
  },

  //活动1输入事件
  activityInput1: function(e) {
    this.setData({
      activity1: e.detail.value
    })
  },

  //时间2输入事件
  timeInput2: function(e) {
    this.setData({
      time2: e.detail.value
    })
  },

  //活动2输入事件
  activityInput2: function(e) {
    this.setData({
      activity2: e.detail.value
    })
  },

  //时间3输入事件
  timeInput3: function(e) {
    this.setData({
      time3: e.detail.value
    })
  },

  //活动3输入事件
  activityInput3: function(e) {
    this.setData({
      activity3: e.detail.value
    })
  },

  //摄影需求选择点击事件
  photoChoose: function(e) {
    wx.navigateTo({
      url: '../photoChoose/photoChoose',
    })
  },

  //纪念品选择点击事件
  souvenirChoose: function(e) {
    wx.navigateTo({
      url: '../souvenirChoose/souvenirChoose',
    })
  },

  //其他需求输入事件
  elseInput: function(e) {
    this.setData({
      elseNeed: e.detail.value
    })
  },

  //发布按钮点击事件
  publish: function(e) {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入活动名称！',
        image: '../../images/icons/error.png'
      })
    } else if (!this.data.people) {
      wx.showToast({
        title: '请输入活动人数！',
        image: '../../images/icons/error.png'
      })
    } else if (!this.data.enrolment) {
      wx.showToast({
        title: '请选择入学年份！',
        image: '../../images/icons/error.png'
      })
    } else if (!this.data.department) {
      wx.showToast({
        title: '请选择院系！',
        image: '../../images/icons/error.png'
      })
    } else if (!this.data.classNumber) {
      wx.showToast({
        title: '请选择班级！',
        image: '../../images/icons/error.png'
      })
    } else if (!this.data.hotelId) {
      wx.showToast({
        title: '请选择宾馆！',
        image: '../../images/icons/error.png'
      })
    } else if (!this.data.hotelPeople) {
      wx.showToast({
        title: '请输入居住人数！',
        image: '../../images/icons/error.png'
      })
    } else if (!this.data.hotelDay) {
      wx.showToast({
        title: '请输入居住天数！',
        image: '../../images/icons/error.png'
      })
    } else {
      const activity = {
        name: this.data.name,
        people: this.data.people,
        enrolment_year: this.data.enrolment.year,
        department: this.data.department.name,
        class_number: this.data.classNumber,
        hotel_id: this.data.hotelId,
        hotel_people: this.data.hotelPeople,
        hotel_day: this.data.hotelDay,
        activity_model_id: this.data.activityModelId,
        create_nickname: app.globalData.userInfo.nickName,
        time1: this.data.time1,
        activity1: this.data.activity1,
        time2: this.data.time2,
        activity2: this.data.activity2,
        time3: this.data.time3,
        activity3: this.data.activity3,
        photo_id: this.data.photoId,
        else_need: this.data.elseNeed,
        status: 0, //未审核
        activity_type: this.data.activityType,
      }
      createActivity(activity).then(res => {
        //console.log(res)
        //若活动选了纪念品，则调用activitySouvenir增加一项
        if (this.data.souvenirIdArray != null) {
          //活动选了纪念品又删了纪念品，不增加一项
          if (this.data.souvenirIdArray.length != 0) {
            var idArrayTemp = this.data.souvenirIdArray.join(',')
            var amountArrayTemp = this.data.souvenirAmountArray.join(',')
            wx.request({
              url: 'http://127.0.0.1:5000/activitySouvenir',
              method: 'POST',
              data: {
                activity_id: res.data,
                souvenir_id: idArrayTemp,
                amount: amountArrayTemp
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(res) {}
            })
          }
        }
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '保存成功！',
        })
      })
    }
  },

})