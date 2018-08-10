import { normalizeMovies } from "../../common/js/movie"
const COUNT = 18

Component({
  data: {
    newstart: 0,
    newtotal: 0,
    newhasMore: true,
    newlist: [],
    lowerLoadingShow: false
  },
  methods: {
    getNewList: function(start, count, list, that) {
      wx.request({
        url: 'https://m.douban.com/rexxar/api/v2/subject_collection/movie_latest/items',
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
              newstart: start,
              newtotal: res.data.total,
              newlist: list.concat(normalizeMovies(res.data.subject_collection_items)),
              newhasMore: res.data.total > (COUNT + start),
              lowerLoadingShow: false
            })
            wx.hideLoading()
          }
        }
      })
    },
    getMoreNewList: function() {
      if (!this.data.newhasMore) {
        return
      }
      this.setData({
        lowerLoadingShow: true
      })
      var start = this.data.newstart + COUNT
      var that = this
      this.getNewList(start, COUNT, this.data.newlist, that)
    }
  },
  attached: function() {
    wx.showLoading({
      title: '正在加载中'
    })
    var that = this
    this.getNewList(this.data.newstart, COUNT, this.data.newlist, that)
  }
})