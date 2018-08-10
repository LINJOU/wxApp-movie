const COUNT = 20

Page({
  data: {
    id: '',
    start: 0,
    reviews: [],
    reviewsTotal: 0,
    hasMore: true,
    lowerLoadingShow: false
  },
  onLoad: function(option) {
    wx.showLoading({
      title: '正在加载中'
    })
    var id = option.id
    this.setData({
      id: id
    })
    var that = this
    this.getReviews(this.data.start, COUNT, this.data.reviews, that)
  },
  getReviews: function(start, count, list, that) {
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + that.data.id + '/reviews',
      header:{
        "Content-Type": 'json'
      },
      data: {
        start: start,
        count: count
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            start: start,
            reviewsTotal: res.data.total,
            reviews: list.concat(res.data.reviews),
            hasMore: res.data.total > (COUNT + start),
            lowerLoadingShow: false
          })
          wx.hideLoading()
        }
      }
    })
  },
  getMoreReviews: function() {
    if (!this.data.hasMore) {
      return
    }
    this.setData({
      lowerLoadingShow: true
    })
    var start = this.data.start + COUNT
    var that = this
    this.getReviews(start, COUNT, this.data.reviews, that)
  }
})