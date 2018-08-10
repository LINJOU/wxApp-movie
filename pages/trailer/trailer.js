Page({
  data: {
    trailers: [],
    currentTrailer: {},
    otherTrailers: []
  },
  onLoad: function(option) {
    var id = option.id
    var trailers = JSON.parse(option.trailers)
    var currentTrailer = this.getCurrentTrailer(id, trailers)
    var otherTrailers = this.getOtherTrailers(id, trailers)
    this.setData({
      trailers,
      currentTrailer,
      otherTrailers
    })
  },
  getCurrentTrailer: function(id, list) {
    var o = {}
    list.forEach(item => {
      if (id === item.id) {
        o = item
      }
    })
    return o
  },
  getOtherTrailers: function(id, list) {
    var res = []
    list.forEach(item => {
      if (id !== item.id) {
        res.push(item)
      }
    })
    return res
  },
  goToTrailer: function(e) {
    var id = e.currentTarget.dataset.videoId
    wx.navigateTo({
      url: '/pages/trailer/trailer?id=' + id + '&trailers=' + JSON.stringify(this.data.trailers)
    })
  }
})