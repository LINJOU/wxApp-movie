Page({
  data: {
    playUrl: ''
  },
  onLoad: function(option) {
    this.setData({
      playUrl: option.playUrl
    })
  }
})