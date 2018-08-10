import { normalizeMovies } from "../../common/js/movie"

const COUNT = 18

Page({
  data: {
    listContentHeight: 0,
    cinemalist: [],
    start: 0,
    total: 0,
    hasMore: true,
    lowerLoadingShow: false
  },
  onLoad: function() {
    wx.showLoading({
      title: '正在加载中'
    })
    var that = this
    this.getCinemaList(this.data.start, COUNT, this.data.cinemalist, that)
  },
  getCinemaList: function(start, count, list, that) {
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_free_stream/items',
      method: 'GET',
      data: {
        os: 'ios',
        for_mobile: 1,
        start: start,
        count: count,
        loc_id: 108288,
        _: 0
      },
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            start: start,
            total: res.data.total,
            cinemalist: list.concat(normalizeMovies(res.data.subject_collection_items)),
            hasMore: res.data.total > (COUNT + start),
            lowerLoadingShow: false
          })
          wx.hideLoading()
        }
      }
    })
  },
  getMorecinemaList: function() {
    if (!this.data.hasMore) {
      return
    }
    this.setData({
      lowerLoadingShow: true
    })
    var start = this.data.start + COUNT
    var that = this
    this.getCinemaList(start, COUNT, this.data.cinemalist, that)
  },
  goToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }
})