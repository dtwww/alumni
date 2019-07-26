const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    donationArray: null,
    inputSearch: '',
    searchArray: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var a = this.getNext('ABCDABD')
    //var a = this.kmp('bacbababadababacambabacaddababacasdsd', 'ababaca')
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
    var that = this
    //调用donation接口返回捐款活动信息
    wx.request({
      url: 'http://127.0.0.1:5000/donation',
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        that.setData({
          donationArray: res.data.list
        })
        // if (that.data.inputSearch != '') {
        //   var array = []
        //   for (var i = 0; i < that.data.donationArray.length; i++) {
        //     //判断数组该项的活动名称或详情是否包含搜索的字符串
        //     if (that.kmp(that.data.donationArray[i].name, that.data.inputSearch) != -1 || that.kmp(that.data.donationArray[i].detail, that.data.inputSearch) != -1) {
        //       array.push(that.data.donationArray[i])
        //     }
        //   }
        //   that.setData({
        //     searchArray: array
        //   })
        // }
      }
    })
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

  //每一项点击事件
  donationDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../donationDetail/donationDetail?id=' +  e.currentTarget.dataset.id,
    })
  },

  //搜索框输入事件
  inputChange: function (e) {
    this.setData({
      inputSearch: e.detail.value
    })
    if (this.data.inputSearch != '') {
      var array = []
      console.log(this.data.donationArray)
      for (var i = 0; i < this.data.donationArray.length; i++) {
        //判断数组该项的活动名称或详情是否包含搜索的字符串
        if (this.kmp(this.data.donationArray[i].name, this.data.inputSearch) != -1 || this.kmp(this.data.donationArray[i].detail, this.data.inputSearch) != -1) {
          array.push(this.data.donationArray[i])
        }
      }
      this.setData({
        searchArray: array
      })
    }
  },

  //kmp算法
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