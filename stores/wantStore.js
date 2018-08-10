import { extendObservable, action } from "../libs/mobx"
import { MovieItem } from "./movieItem"

var WantStore = function() {
  extendObservable(this, {
    wants: wx.getStorageSync('wants').length > 0 ? wx.getStorageSync('wants') : []
  })

  this.addWant = action(item => {
    this.wants.unshift(new MovieItem(item))
    wx.setStorage({
      key: 'wants',
      data: this.wants.slice()
    })
  })

  this.removeWant = action(id => {
    var index = this.wants.forEach((item, index) => {
      if (id = item.id) {
        return index
      }
    })
    this.wants.splice(index, 1)
    wx.setStorage({
      key: 'wants',
      data: this.wants.slice()
    })
  })

  this.removeALLWants = action(() => {
    this.wants.splice(0, this.wants.length)
    wx.removeStorage({
      key: 'wants'
    })
  })
}

module.exports.WantStore = WantStore