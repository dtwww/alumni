import {
  saveUser,
  createUser
} from '../../utils/api.js'
import {
  enrolmentOptions
} from '../../utils/appConfig.js'
const app = getApp()

// pages/personalInfo/personalInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nickname: app.globalData.userInfo.nickName,
    enrolmentOptions,
    isEditing: false,
    name: null,
    sex: null,
    contact: null,
    enrolment: null,
    department: null,
    classNumber: null,
    nickName: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      nickName: app.globalData.userInfo.nickName
    })
    const enrolment = enrolmentOptions.find(option => option.year === app.globalData.completeUserInfo.enrolmentYear)
    const department = enrolment ? enrolment.departments.find(department => department.name === app.globalData.completeUserInfo.department) : null
    this.setData({
      userInfo: app.globalData.userInfo,
      name: app.globalData.completeUserInfo.name,
      sex: app.globalData.completeUserInfo.sex,
      enrolment,
      department,
      classNumber: app.globalData.completeUserInfo.classNumber,
      contact: app.globalData.completeUserInfo.contact
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

  //输入姓名事件
  onNameChange: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //输入性别事件
  onSexChange: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },

  //输入联系方式事件
  onContactChange: function(e) {
    this.setData({
      contact: e.detail.value
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
  onSelectClass: function(e) {
    const index = e.detail.value
    if (this.data.department) {
      this.setData({
        classNumber: this.data.department.classes[index]
      })
    }
  },

  //编辑按钮点击事件
  onPressEdit: function(e) {
    this.setData({
      isEditing: true
    })
  },

  //取消按钮点击事件
  onPressCancel: function(e) {
    this.setData({
      isEditing: false
    })
  },

  //保存按钮点击事件
  onPressSave: function(e) {
    const newUserData = {
      name: this.data.name,
      sex: this.data.sex,
      contact: this.data.contact,
      enrolmentYear: this.data.enrolment.year,
      department: this.data.department.name,
      classNumber: this.data.classNumber
    }
    const nickName = app.globalData.userInfo.nickName
    saveUser(nickName, newUserData)
    this.setData({
      isEditing: false,
    })
    app.globalData.completeUserInfo.name = this.data.name
    app.globalData.completeUserInfo.contact = this.data.contact
    app.globalData.completeUserInfo.enrolmentYear = this.data.enrolment.year
    app.globalData.completeUserInfo.department = this.data.department.name
    app.globalData.completeUserInfo.classNumber = this.data.classNumber
  },
})