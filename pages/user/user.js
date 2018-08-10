import { observer } from "../../libs/observer"
import { stores } from "../../stores/stores"

Page(observer({
  props: {
    wantStores: stores.want,
    watchedStores: stores.watched,
    collectStores: stores.collect
  },
  data: {
    switchesName: [
      {name: '想看'},
      {name: '看过'},
      {name: '影人'}
    ],
    imgUrl: '../../image/user/user-image.png',
    currentIndex: 0,
  },
  selectIndex: function(e) {
    var index = e.detail
    if (this.data.currentIndex === index) {
      return
    }
    this.setData({
      currentIndex: index
    })
  },
  deleteWants: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否清除想看列表',
      success: function(res) {
        if (res.confirm) {
          that.props.wantStores.removeALLWants()
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteWatcheds: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否清除看过列表',
      success: function(res) {
        if (res.confirm) {
          that.props.watchedStores.removeALLWatched()
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteWantsItem: function(e) {
    var id = e.detail
    this.props.wantStores.removeWant(id)
    wx.showToast({
      title: '移除成功',
      icon: 'success',
      duration: 1000
    })
  },
  deleteWatchedsItem: function(e) {
    var id = e.detail
    this.props.watchedStores.removeWatched(id)
    wx.showToast({
      title: '移除成功',
      icon: 'success',
      duration: 1000
    })
  },
  deleteCollects: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否清除影人列表',
      success: function(res) {
        if (res.confirm) {
          that.props.collectStores.removeALLCollect()
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteCollentsItem: function(e) {
    var id = e.detail
    this.props.collectStores.removeCollect(id)
    wx.showToast({
      title: '移除成功',
      icon: 'success',
      duration: 1000
    })
  }
}))