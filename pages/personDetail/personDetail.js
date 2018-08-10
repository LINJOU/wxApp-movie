import { createDetail } from "../../common/js/personDetail"
import { observer } from "../../libs/observer"
import { stores } from "../../stores/stores"

Page(observer({
  props: {
    collectStores: stores.collect
  },
  data: {
    skeletonLists: [],
    collect: false,
    detail: [],
    showDetail: false
  },
  onLoad: function(option) {
    var that = this
    wx.createSelectorQuery().selectAll('.skeleton-rect').boundingClientRect().exec(res => {
      that.setData({
        skeletonLists: res[0]
      })
		})
    wx.showLoading({
      title: '正在加载中'
    })
    var id = option.id
    this.setData({
      collect: this.isExist(id, this.props.collectStores.collects)
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/celebrity/' + id,
      method: 'GET',
      header:{
        "Content-Type": 'json'
      },
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            detail: createDetail(res.data),
            showDetail: true
          })
          wx.hideLoading()
        }
      }
    })
  },
  selectItem: function(e) {
    var id = e.currentTarget.dataset.movieId
    var tag = e.currentTarget.dataset.tagName
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id=' + id +'&tag=' + tag
    })
  },
  collectItem: function() {
    if (this.data.detail.length === 0) {
      return
    }
    var collect = !this.data.collect
    this.setData({
      collect
    })
    if (collect) {
      this.props.collectStores.addCollect(this.data.detail)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      this.props.collectStores.removeCollect(this.data.detail.id)
      wx.showToast({
        title: '移除成功',
        icon: 'success',
        duration: 1000
      })
    }
  },
  // 判断是否存在列表
  isExist: function(id, list) {
    var index = list.findIndex(item => {
      return id === item.id
    })
    return index > -1
  }
}))