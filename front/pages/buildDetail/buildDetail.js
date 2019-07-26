// pages/buildDetail/buildDetail.js

import { getEntity } from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgs: null,
    id: null,
    type: null,
    detail: null,
    markers: [{ //标记点
      iconPath: "../../images/icons/activity_unselected.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{ //指定一系列坐标点，从数组第一项连线至最后一项
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{ //控件
      id: 1,
      iconPath: '../../images/icons/activity_selected.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      type: options.type
    })
    //console.log(options)
    var that = this
    getEntity(this.data.type, this.data.id).then(res => {
      that.setData({
        detail: res.data
      })
      const { picture1, picture2, picture3 } = that.data.detail
      that.setData({
        swiperImgs: [ picture1, picture2, picture3 ]
      })
      //console.log(that.data.swiperImgs)
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

  //点击地图控件触发，返回control的id
  controltap: function(e) {
    //console.log(e)
  },

  //点击标记点触发，返回maker的id
  markertap: function(e) {
    //console.log(e)
  },

  //视野发生变化时触发
  regionchange: function(e) {
    //console.log(e)
  }
})