import { extendObservable, action } from "../libs/mobx"

const HISTORYLENGTH = 12

var SearchHistoryStore = function() {
  extendObservable(this, {
    searchHistory: wx.getStorageSync('searchHistory').length > 0 ? wx.getStorageSync('searchHistory') : []
  })

  this.addSearchHistory = action(query => {
    var index = this.searchHistory.indexOf(query)
    if (index !== -1) {
      this.searchHistory.splice(index, 1)
      this.searchHistory.unshift(query)
    } else {
      this.searchHistory.unshift(query)
    }
    wx.setStorage({
      key: 'searchHistory',
      data: this.searchHistory.slice(0, HISTORYLENGTH)
    })
  })

  this.removeAllSearchHistory = action(() => {
    this.searchHistory.splice(0, HISTORYLENGTH)
    wx.removeStorage({
      key: 'searchHistory'
    })
  })
}

module.exports.SearchHistoryStore = SearchHistoryStore