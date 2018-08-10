Page({
  data: {
    switchesName: [
      {name: '影院热映'},
      {name: '新片速递'}
    ],
    currentIndex: 0,
    scrollViewHeight: 0,
    starSize: 30
  },
  selectIndex: function(e) {
    this.setData({
      currentIndex: e.detail
    })
  }
})