import { normalizeMovies } from "../../common/js/movie"

const COUNT = 18

Component({
  data: {
    hotstart: 0,
    hottotal: 0,
    hothasMore: true,
    hotlist: [],
    lowerLoadingShow: false
  },
  methods: {
    getHotList: function(start, count, list, that) {
      wx.request({
        url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_showing/items',
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
              hotstart: start,
              hottotal: res.data.total,
              hotlist: list.concat(normalizeMovies(res.data.subject_collection_items)),
              hothasMore: res.data.total > (COUNT + start),
              lowerLoadingShow: false
            })
            wx.hideLoading()
          }
        }
      })
    },
    getMoreHotList: function() {
      if (!this.data.hothasMore) {
        return
      }
      this.setData({
        lowerLoadingShow: true
      })
      var start = this.data.hotstart + COUNT
      var that = this
      this.getHotList(start, COUNT, this.data.hotlist, that)
    }
  },
  attached: function() {
    wx.showLoading({
      title: '正在加载中'
    })
    var that = this
    this.getHotList(this.data.hotstart, COUNT, this.data.hotlist, that)
  }
})