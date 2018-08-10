const COUNT = 20
const HOT = 'hot'
const LATEST = 'latest'

Page({
  data: {
    id: '',
    switchesName: [
      {name: '热门短评'},
      {name: '最新短评'}
    ],
    currentIndex: 0,
    hotStart: 0,
    latestStart: 0,
    hotInterests: [],
    latestInterests: [],
    total: 0,
    hotHasMore: true,
    latestHasMore: true,
    hotlowerLoadingShow: false,
    latestlowerLoadingShow: false
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
    this.getInterests(HOT, this.data.hotStart, COUNT, this.data.hotInterests, that)
    this.getInterests(LATEST, this.data.latestStart, COUNT, this.data.latestInterests, that)
  },
  getInterests: function(type, start, count, list, that) {
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/movie/' + that.data.id + '/interests',
      data:{
        count: count,
        order_by: type,
        start: start,
        ck: '',
        for_mobile: 1
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          if (type === 'hot') {
            that.setData({
              hotStart: start,
              total: res.data.total,
              hotInterests: list.concat(res.data.interests),
              hotHasMore: res.data.total > (COUNT + start),
              hotlowerLoadingShow: false
            })
          } else {
            that.setData({
              latestStart: start,
              total: res.data.total,
              latestInterests: list.concat(res.data.interests),
              latestHasMore: res.data.total > (COUNT + start),
              latestlowerLoadingShow: false
            })
          }
          wx.hideLoading()
        }
      }
    })
  },
  getMoreHotInterests: function() {
    if (!this.data.hotHasMore) {
      return
    }
    this.setData({
      hotlowerLoadingShow: true
    })
    var start = this.data.hotStart + COUNT
    var that = this
    this.getInterests(HOT, start, COUNT, this.data.hotInterests, that)
  },
  getMoreLatestInterests: function() {
    if (!this.data.latestHasMore) {
      return
    }
    this.setData({
      latestlowerLoadingShow: true
    })
    var start = this.data.latestStart + COUNT
    var that = this
    this.getInterests(LATEST, start, COUNT, this.data.latestInterests, that)
  },
  selectIndex: function(e) {
    this.setData({
      currentIndex: e.detail
    })
  }
})