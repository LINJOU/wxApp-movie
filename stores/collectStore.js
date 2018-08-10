import { extendObservable, action } from "../libs/mobx"
import { CollectItem } from "./collectItem"

var CollectStore = function() {
  extendObservable(this, {
    collects: wx.getStorageSync('collects').length > 0 ? wx.getStorageSync('collects') : []
  })

  this.addCollect = action(item  => {
    this.collects.unshift(new CollectItem(item))
    wx.setStorage({
      key: 'collects',
      data: this.collects.slice()
    })
  })

  this.removeCollect = action(id => {
    var index = this.collects.forEach((item, index) => {
      if (id = item.id) {
        return index
      }
    })
    this.collects.splice(index, 1)
    wx.setStorage({
      key: 'collects',
      data: this.collects.slice()
    })
  })

  this.removeALLCollect = action(() => {
    this.collects.splice(0, this.collects.length)
    wx.removeStorage({
      key: 'collects'
    })
  })
}

module.exports.CollectStore = CollectStore