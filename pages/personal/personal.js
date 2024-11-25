// pages/personal/personal.js
import request from '../../utils/request'
let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)', // 位移
    coveTransition: '', // 过渡
    userInfo: {}, // 用户信息
    recentPlayList: [], // 用户播放记录,
    userInfo: {}, // 用户信息
    recentPlayList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo);
    if(userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    this.getRecentPlayList(this.data.userInfo.userId)
  },
  handleTouchStart(event) {
    this.setData({
      coveTransition: ''
    })
    // 获取手指起始坐标
    startY = event.touches[0].clientY
  },
  handleTouchMove (event) {
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    if(moveDistance <= 0) return;
    if(moveDistance >= 80) moveDistance = 80;
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd (event) {
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },
  async getRecentPlayList () {
    let result = await request('/user/record', {uid: 2, type: 0})
    console.log(result);
    let recentPlayList = result.allData.splice(0,10).map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      recentPlayList
    })
  },
  // 跳转至登录login页面的回调
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})