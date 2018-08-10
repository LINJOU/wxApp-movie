const COUNT = 20

Page({
  data: {
    forumTopics: [],
    forumTopicsTotal: 0,
    id: '',
    start: 0,
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
    this.getForumTopics(this.data.start, COUNT, this.data.forumTopics, that)
  },
  getForumTopics: function(start, count, list, that) {
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/movie/' + that.data.id + '/forum_topics',
      data: {
        start: start,
        count: count,
        ck: '',
        for_mobile: 1,
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            start: start,
            forumTopicsTotal: res.data.total,
            forumTopics: list.concat(res.data.forum_topics),
            hasMore: res.data.total > (COUNT + start),
            lowerLoadingShow: false
          })
          wx.hideLoading()
        }
      }
    })
  },
  getMoreForumTopics: function() {
    if (!this.data.hasMore) {
      return
    }
    this.setData({
      lowerLoadingShow: true
    })
    var start = this.data.start + COUNT
    var that = this
    this.getForumTopics(start, COUNT, this.data.forumTopics, that)
  }
})