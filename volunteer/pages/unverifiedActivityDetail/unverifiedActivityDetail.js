// pages/userCreateUnpublished/userCreateUnpublished.js
import {
  getEntity,
  updateEntity,
} from '../../utils/api.js'
import {
  enrolmentOptions
} from '../../utils/appConfig.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    hasNewSouvenir: false,

    createPersonInfo: null,

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
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
      hasNewSouvenir: currPage.data.hasNewSouvenir,
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
    //console.log(e)
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
  onActivityTypeChange: function(e) {
    this.setData({
      activityType: e.detail.value
    })
  },

  //选择入学年份
  onSelectEnrolmentYear: function(e) {
    const index = e.detail.value
    this.setData({
      enrolment: enrolmentOptions[index],
      department: null,
      classNumber: null
    })
  },

  //选择专业
  onSelectDepartment: function(e) {
    const index = e.detail.value
    if (this.data.enrolment) {
      this.setData({
        department: this.data.enrolment.departments[index],
        classNumber: null
      })
    }
  },

  //选择班级
  onSelectClassNumber: function(e) {
    const index = e.detail.value
    if (this.data.department) {
      this.setData({
        classNumber: this.data.department.classes[index]
      })
    }
  },

  // //专业输入事件
  // majorInput: function (e) {
  //   this.setData({
  //     major: e.detail.value
  //   })
  // },

  // //毕业年份输入事件
  // graduateInput: function (e) {
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
      url: '../activityModelChoose/activityModelChoose',
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

  //审核通过点击事件
  verify: function(e) {
    //保存且修改status为1
    var that = this
    const newActivity = {
      name: that.data.name,
      people: that.data.people,
      enrolment_year: that.data.enrolment.year,
      department: that.data.department.name,
      class_number: that.data.classNumber,
      hotel_id: that.data.hotelId,
      hotel_people: that.data.hotelPeople,
      hotel_day: that.data.hotelDay,
      activity_model_id: that.data.activityModelId,
      // create_nickname: that.data.creatNickName,
      time1: that.data.time1,
      activity1: that.data.activity1,
      time2: that.data.time2,
      activity2: that.data.activity2,
      time3: that.data.time3,
      activity3: that.data.activity3,
      photo_id: that.data.photoId,
      else_need: that.data.elseNeed,
      status: 1,
      activity_type: that.data.activityType,
    }
    updateEntity('activity', that.data.id, newActivity).then(res => {
      //更改了该活动的纪念品，需要调用activitySouvenir接口
      if (that.data.hasNewSouvenir == true) {
        if (that.data.souvenirIdArray != null) {
          var idArrayTemp = that.data.souvenirIdArray.join(',')
          console.log(idArrayTemp)
          var amountArrayTemp = that.data.souvenirAmountArray.join(',')
          console.log(amountArrayTemp)
        }
        //console.log(that.data.activitySouvenirArray[0])
        //console.log(idArrayTemp)
        //该活动原来有纪念品，修改即可（分为修改和删除，在后端put函数实现）
        if (that.data.activitySouvenirArray.length != 0) {
          //console.log(that.data.activitySouvenirArray)
          wx.request({
            url: 'http://127.0.0.1:5000/activitySouvenir?id=' + that.data.activitySouvenirArray[0].id,
            method: 'PUT',
            data: {
              // activity_id: that.data.id,
              souvenir_id: idArrayTemp,
              amount: amountArrayTemp
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {}
          })
        }
        //该活动原来没有纪念品，需要增加一条
        else {
          wx.request({
            url: 'http://127.0.0.1:5000/activitySouvenir',
            method: 'POST',
            data: {
              activity_id: that.data.id,
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
        title: '成功！',
      })
    })
  },

  //联系负责人点击事件
  callLeader: function(e) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:5000/user?nickname=' + that.data.createNickName,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success(res) {
        that.setData({
          createPersonInfo: res.data
        })
        wx.makePhoneCall({
          phoneNumber: that.data.createPersonInfo.contact,
        })
      }
    })
  },

  //确定按钮点击事件
  yes: function(e) {
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
      var that = this
      const newActivity = {
        name: that.data.name,
        people: that.data.people,
        enrolment_year: that.data.enrolment.year,
        department: that.data.department.name,
        class_number: that.data.classNumber,
        hotel_id: that.data.hotelId,
        hotel_people: that.data.hotelPeople,
        hotel_day: that.data.hotelDay,
        activity_model_id: that.data.activityModelId,
        // create_nickname: that.data.creatNickName,
        time1: that.data.time1,
        activity1: that.data.activity1,
        time2: that.data.time2,
        activity2: that.data.activity2,
        time3: that.data.time3,
        activity3: that.data.activity3,
        photo_id: that.data.photoId,
        else_need: that.data.elseNeed,
        // status: 0,
        activity_type: that.data.activityType,
      }
      updateEntity('activity', that.data.id, newActivity).then(res => {
        //更改了该活动的纪念品，需要调用activitySouvenir接口
        if (that.data.hasNewSouvenir == true) {
          if (that.data.souvenirIdArray != null) {
            var idArrayTemp = that.data.souvenirIdArray.join(',')
            console.log(idArrayTemp)
            var amountArrayTemp = that.data.souvenirAmountArray.join(',')
            console.log(amountArrayTemp)
          }
          //console.log(that.data.activitySouvenirArray[0])
          //console.log(idArrayTemp)
          //该活动原来有纪念品，修改即可（分为修改和删除，在后端put函数实现）
          if (that.data.activitySouvenirArray.length != 0) {
            //console.log(that.data.activitySouvenirArray)
            wx.request({
              url: 'http://127.0.0.1:5000/activitySouvenir?id=' + that.data.activitySouvenirArray[0].id,
              method: 'PUT',
              data: {
                // activity_id: that.data.id,
                souvenir_id: idArrayTemp,
                amount: amountArrayTemp
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(res) {}
            })
          }
          //该活动原来没有纪念品，需要增加一条
          else {
            if (idArrayTemp) {
              wx.request({
                url: 'http://127.0.0.1:5000/activitySouvenir',
                method: 'POST',
                data: {
                  activity_id: that.data.id,
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
        }
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          title: '成功！',
        })
      })
    }
  },
})