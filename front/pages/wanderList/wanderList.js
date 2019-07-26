// pages/wanderList/wanderList.js
import { getEntity } from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marketColor: "white",
    marketBgColor: "#07C160",
    studyColor: "#07C160",
    sdutyBgColor: "white",
    apartmentColor: "#07C160",
    apartmentBgColor: "white",
    isMarket: true,
    isStudy: false,
    isApartment: false,
    marketArray: null,
    studyArray: null,
    apartmentArray: null,
    inputSearch: null,
    searchMarketArray: null,
    searchStudyArray: null,
    searchApartmentArray: null,
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
    //调用market接口返回信息
    getEntity('market').then(res => {
      this.setData({
        marketArray: res.data.list
      })
    })

    //调用study接口返回信息
    getEntity('study').then(res => {
      this.setData({
        studyArray: res.data.list
      })
    })

    //调用apartment接口返回信息
    getEntity('apartment').then(res => {
      this.setData({
        apartmentArray: res.data.list
      })
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

  //搜索框输入事件
  inputChange: function(e) {

  },

  //超市按钮点击事件
  sortMarket: function(e) {
    if (this.data.marketColor == "#07C160") {
      this.setData({
        isMarket: true,
        isStudy: false,
        isApartment: false,
        marketColor: "white",
        marketBgColor: "#07C160",
        studyColor: "#07C160",
        studyBgColor: "white",
        apartmentColor: "#07C160",
        apartmentBgColor: "white",
      })
    }
  },

  //自习室按钮点击事件
  sortStudy: function(e) {
    if (this.data.studyColor == "#07C160") {
      this.setData({
        isMarket: false,
        isStudy: true,
        isApartment: false,
        studyColor: "white",
        studyBgColor: "#07C160",
        marketColor: "#07C160",
        marketBgColor: "white",
        apartmentColor: "#07C160",
        apartmentBgColor: "white"
      })
    }
  },

  //公寓按钮点击事件
  sortApartment: function(e) {
    if (this.data.apartmentColor == "#07C160") {
      this.setData({
        isMarket: false,
        isStudy: false,
        isApartment: true,
        apartmentColor: "white",
        apartmentBgColor: "#07C160",
        marketColor: "#07C160",
        marketBgColor: "white",
        studyColor: "#07C160",
        studyBgColor: "white"
      })
    }
  },

  //查看建筑详情页
  buildDetail: function(e) {
    //console.log(e)
    if (this.data.isMarket) {
      wx.navigateTo({
        url: '../buildDetail/buildDetail?info=' + '&id=' + e.currentTarget.dataset.id + '&type=market',
      })
    } else if (this.data.isStudy) {
      wx.navigateTo({
        url: '../buildDetail/buildDetail?info=' + '&id=' + e.currentTarget.dataset.id + '&type=study',
      })
    } else if (this.data.isApartment) {
      wx.navigateTo({
        url: '../buildDetail/buildDetail?info=' + '&id=' + e.currentTarget.dataset.id + '&type=apartment',
      })
    }

  },

  //搜索框输入事件
  inputChange: function (e) {
    this.setData({
      inputSearch: e.detail.value
    })
    if (this.data.inputSearch != null) {
      var array1 = [], array2 = [], array3 = []
      for (var i = 0; i < this.data.marketArray.length; i++) {
        //判断数组该项的名称、介绍或地点是否包含搜索的字符串
        if (this.kmp(this.data.marketArray[i].name, this.data.inputSearch) != -1 || this.kmp(this.data.marketArray[i].detail, this.data.inputSearch) != -1 || this.kmp(this.data.marketArray[i].address, this.data.inputSearch) != -1) {
          array1.push(this.data.marketArray[i])
        }
      }
      for (var i = 0; i < this.data.studyArray.length; i++) {
        //判断数组该项的名称、介绍或地点是否包含搜索的字符串
        if (this.kmp(this.data.studyArray[i].name, this.data.inputSearch) != -1 || this.kmp(this.data.studyArray[i].detail, this.data.inputSearch) != -1 || this.kmp(this.data.studyArray[i].address, this.data.inputSearch) != -1) {
          array2.push(this.data.studyArray[i])
        }
      }
      for (var i = 0; i < this.data.apartmentArray.length; i++) {
        //判断数组该项的名称、介绍或地点是否包含搜索的字符串
        if (this.kmp(this.data.apartmentArray[i].name, this.data.inputSearch) != -1 || this.kmp(this.data.apartmentArray[i].detail, this.data.inputSearch) != -1 || this.kmp(this.data.apartmentArray[i].address, this.data.inputSearch) != -1) {
          array3.push(this.data.marketArray[i])
        }
      }
      this.setData({
        searchMarketArray: array1,
        searchStudyArray: array2,
        searchApartmentArray: array3,
      })
    }
  },

  //KMP算法
  kmp: function (S, T) {
    var next = []
    next[0] = -1
    var i = 1, j = 0
    next[1] = 0
    while (i < T.length) {
      if (j == 0 || T[i - 1] == T[j - 1]) {
        ++i
        ++j
        next[i] = j
      } else {
        j = next[j]
      }
    }

    var i = 0, j = 0
    while (i < S.length && j < T.length) {
      if (j == -1 || S[i] == T[j]) {
        i++
        j++
      } else {
        //console.log(this.data.next)
        j = next[j]
      }                   //i不变,j后退
    }
    if (j >= T.length) {   //匹配成功
      return i - j
      //console.log(i - j)
    } else {	            //返回不匹配标志
      return -1
      //console.log(-1)
    }
  }
})