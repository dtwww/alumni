// pages/souvenirChoose/souvenirChoose.js
import { getEntity } from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    souvenirArray: null,
    souvenirIdArray: null,
    souvenirNameArray: null,
    souvenirAmountArray: null,
    souvenirNameAmountArray: null,
    souvenirIdAmountArray: [],
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
    //返回纪念品列表
    getEntity('souvenir').then(res => this.setData({
      souvenirArray: res.data.list
    }))
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

  //多选框变化事件
  checkboxChange: function (e) {
    //console.log(e.detail.value);
    // this.setData({
    //   souvenirIdArray: e.detail.value,
    // })
  },

  //输入纪念品数量事件
  souvenirAmount: function (e) {
    var newInput = true
    //console.log(e)
    for (var i = 0; i < this.data.souvenirIdAmountArray.length; i++) {
      //console.log('a')
      if (this.data.souvenirIdAmountArray[i].id == e.currentTarget.dataset.id) {
        //console.log('b')
        var tempArray = this.data.souvenirIdAmountArray
        tempArray[i].amount = e.detail.value
        this.setData({
          souvenirIdAmountArray: tempArray
        })
        newInput = false
        break
      }
    }
    if (newInput == true) {
      this.data.souvenirIdAmountArray.push({
        id: e.currentTarget.dataset.id,
        amount: e.detail.value
      })
    }
    //console.log(this.data.souvenirIdAmountArray)
  },

  //确定按钮点击事件
  yes: function (e) {
    // var array = []
    // if (this.data.souvenirIdArray!=null){
    //   for (var i = 0; i < this.data.souvenirIdArray.length; i++) {
    //     //console.log(array)
    //     array[array.length] = this.data.souvenirArray[this.data.souvenirIdArray[i] - 1].name
    //   }
    //   this.setData({
    //     souvenirNameArray: array
    //   })
    // }
    var idArray = []
    var nameArray = []
    var amountArray = []
    var nameAmountArray = []
    if (this.data.souvenirIdAmountArray != null) {
      if (this.data.souvenirIdAmountArray.length != 0) {
        for (var i = 0; i < this.data.souvenirIdAmountArray.length; i++) {
          //console.log(array)
          nameArray[nameArray.length] = this.data.souvenirArray[this.data.souvenirIdAmountArray[i].id - 1].name
          idArray.push(this.data.souvenirIdAmountArray[i].id)
          amountArray.push(this.data.souvenirIdAmountArray[i].amount)
          nameAmountArray.push({
            name: this.data.souvenirArray[this.data.souvenirIdAmountArray[i].id - 1].name,
            amount: this.data.souvenirIdAmountArray[i].amount
          })
        }
        this.setData({
          souvenirNameArray: nameArray,
          souvenirIdArray: idArray,
          souvenirAmountArray: amountArray,
          souvenirNameAmountArray: nameAmountArray
        })
        // console.log(this.data.souvenirNameArray)
        // console.log(this.data.souvenirIdArray)
        // console.log(this.data.souvenirAmountArray)
        // console.log(this.data.souvenirNameAmountArray)
      }

      //console.log(this.data.souvenirNameArray)
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        souvenirIdArray: this.data.souvenirIdArray,
        souvenirNameArray: this.data.souvenirNameArray,
        souvenirAmountArray: this.data.souvenirAmountArray,
        souvenirNameAmountArray: this.data.souvenirNameAmountArray,
        hasNewSouvenir: true
      })
      wx.navigateBack({ //返回
        delta: 1
      })
    }
  }
})
