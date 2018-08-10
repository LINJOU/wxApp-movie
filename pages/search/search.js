import { normalizeMovies } from '../../common/js/searchResult'
import { observer } from "../../libs/observer"
import { stores } from "../../stores/stores"

const COUNT = 20

Page(observer({
  props: {
    searchHistoryStores: stores.searchHistory
  },
  data: {
    outQuery: '',
    focus: true,
    query: '',
    showResult: false,
    searchResultList: [],
    hasMore: true,
    resultstart: 0,
    resulttotal: 0,
    resultcount: 0,
    noResult: false,
    lowerLoadingShow: false
  },
  clearHistory: function() {
    this.props.searchHistoryStores.removeAllSearchHistory()
  },
  selectItem: function(e) {
    wx.showLoading({
      title: '正在搜索中...'
    })
    this.setData({
      resultstart: 0,
      searchResultList: []
    })
    var that = this
    var query = e.currentTarget.dataset.itemTxt
    this.props.searchHistoryStores.addSearchHistory(query)
    this.getSearchResult(this.data.resultstart, COUNT, this.data.searchResultList, query, that)
    this.setData({
      outQuery: query,
      query: query,
      showResult: true
    })
  },
  getQuery: function(e) {
    wx.showLoading({
      title: '正在搜索中...'
    })
    var that = this
    var query = e.detail
    var show = query.length > 0
    if (query.length > 0) {
      this.setData({
        resultstart: 0,
        searchResultList: []
      })
      this.getSearchResult(this.data.resultstart, COUNT, this.data.searchResultList, query, that)
      this.props.searchHistoryStores.addSearchHistory(query)
    }
    this.setData({
      query: query,
      showResult: show
    })
  },
  getSearchResult: function(start, count, list, query, that) {
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search',
      method: 'GET',
      data: {
        q: query,
        start: start,
        count: count
      },
      header:{
        "Content-Type": 'json'
      },
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            resultstart: res.data.start,
            resulttotal: res.data.total,
            searchResultList: list.concat(normalizeMovies(res.data.subjects)),
            hasMore: res.data.total > (COUNT + start),
            lowerLoadingShow: false,
            noResult: res.data.subjects.length === 0
          })
          wx.hideLoading()
        }
      }
    })
  },
  getMoreResult: function() {
    if (!this.data.hasMore) {
      return
    }
    this.setData({
      lowerLoadingShow: true
    })
    var start = this.data.resultstart + COUNT
    var query = this.data.query
    var that = this
    this.getSearchResult(start, COUNT, this.data.searchResultList, query, that)
  },
  closed: function() {
    this.setData({
      outQuery: '',
      query: '',
      showResult: false,
      hasMore: true,
      resultstart: 0,
      resulttotal: 0,
      resultcount: 0
    })
    this.selectComponent("#searchBox").clear()
  }
}))