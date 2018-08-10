import { extendObservable, action } from "../libs/mobx"
import { MovieItem } from "./movieItem"

var WatchedStore = function() {
  extendObservable(this, {
    watcheds: wx.getStorageSync('watcheds').length > 0 ? wx.getStorageSync('watcheds') : []
  })

  this.addWatched = action(item => {
    this.watcheds.unshift(new MovieItem(item))
    wx.setStorage({
      key: 'watcheds',
      data: this.watcheds.slice()
    })
  })

  this.removeWatched = action(id => {
    var index = this.watcheds.forEach((item, index) => {
      if (id = item.id) {
        return index
      }
    })
    this.watcheds.splice(index, 1)
    wx.setStorage({
      key: 'watcheds',
      data: this.watcheds.slice()
    })
  })

  this.removeALLWatched = action(() => {
    this.watcheds.splice(0, this.watcheds.length)
    wx.removeStorage({
      key: 'watcheds'
    })
  })
}

module.exports.WatchedStore = WatchedStore