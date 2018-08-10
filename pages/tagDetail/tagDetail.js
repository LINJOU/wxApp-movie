import { normalizeMovies } from '../../common/js/searchResult'

const COUNT = 20

Page({
  data: {
    tag: '',
    start: 0,
    total: 0,
    hasMore: true,
    taglist: [],
    lowerLoadingShow: false
  },
  onLoad: function(option) {
    wx.showLoading({
      title: '正在加载中'
    })
    var that = this
    var tag = option.tag
      that.setData({
        tag: tag
      })
    this.getTagList(this.data.start, COUNT, this.data.taglist, that)
  },
  getTagList: function(start, count, list, that) {
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search',
      method: 'GET',
      data: {
        tag: that.data.tag,
        start: start,
        count: count
      },
      header:{
        "Content-Type": 'json'
      },
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            start: start,
            total: res.data.total,
            taglist: list.concat(normalizeMovies(res.data.subjects)),
            hasMore: res.data.total > (COUNT + start),
            lowerLoadingShow: false
          })
          wx.hideLoading()
        }
      }
    })
  },
  getMoreTagList: function() {
    if (!this.data.hasMore) {
      return
    }    
    this.setData({
      lowerLoadingShow: true
    })
    var start = this.data.start + COUNT
    var that = this
    this.getTagList(start, COUNT, this.data.taglist, that)
  },
  goToSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }
})