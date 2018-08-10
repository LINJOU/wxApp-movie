import { createDetail } from "../../common/js/movieDetail"
import { normalizeMovies } from "../../common/js/searchResult"
import { normalizeCredits } from "../../common/js/credits"
import { observer } from "../../libs/observer"
import { stores } from "../../stores/stores"

Page(observer({
  props: {
    wantedStores: stores.want,
    watchedStores: stores.watched
  },
  data: {
    skeletonLists: [],
    want: false,
    watched: false,
    starSize: 24,
    showDetail: false,
    detail: [],
    credits: [],
    interests: [],
    interestsTotal: 0,
    forumTopics: [],
    forumTopicsTotal: 0,
    reviewsTotal: 0,
    reviews: [],
    recommendList: []
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
    var tag = option.tag
    // 相关推荐
    tag = this.sliceTag(tag).slice(0, 2).join('、')
    this.setData({
      want: this.isExist(id, this.props.wantedStores.wants),
      watched: this.isExist(id, this.props.watchedStores.watcheds)
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + id,
      header:{
        "Content-Type": 'json'
      },
      method: 'GET',
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
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/movie/' + id + '/credits',
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            credits: normalizeCredits(res.data.credits)
          })
        }
      }
    })
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/movie/' + id + '/interests',
      method: 'GET',
      data: {
        count: 6,
        order_by: 'hot',
        start: 0,
        ck: '',
        for_mobile: 1
      },
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            interestsTotal: res.data.total,
            interests: res.data.interests        
          })
        }
      }
    })
    wx.request({
      url: 'https://m.douban.com/rexxar/api/v2/movie/' + id + '/forum_topics',
      method: 'GET',
      data: {
        start: 0,
        count: 6,
        ck: '',
        for_mobile: 1
      },
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            forumTopicsTotal: res.data.total,
            forumTopics: res.data.forum_topics
          })
        }
      }
    })
    wx.request({
      url: 'https://douban.uieee.com//v2/movie/search',
      header:{
        "Content-Type": 'json'
      },
      data: {
        q: tag
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          recommendList: that.removeAlikeMovie(normalizeMovies(res.data.subjects), id).slice(0, 10)
        })
      }  
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + id + '/reviews',
      header:{
        "Content-Type": 'json'
      },
      data: {
        start: 0,
        count: 10
      },
      method: 'GET',
      success: function(res) {
        if (res.statusCode === 200) {
          that.setData({
            reviewsTotal: res.data.total,
            reviews: res.data.reviews
          })
        }
      }
    })
  },
  // 判断是否存在列表
  isExist: function(id, list) {
    var index = list.findIndex(item => {
      return id === item.id
    })
    return index > -1
  },
  wantMovie: function() {
    if (this.data.detail.length === 0) {
      return
    }
    var want = !this.data.want
    this.setData({
      want
    })
    if (want) {
      this.props.wantedStores.addWant(this.data.detail)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      this.props.wantedStores.removeWant(this.data.detail)
      wx.showToast({
        title: '移除成功',
        icon: 'success',
        duration: 1000
      })
    }
  },
  watchedMovie: function() {
    if (this.data.detail.length === 0) {
      return
    }
    var watched = !this.data.watched
    this.setData({
      watched
    })
    if (watched) {
      this.props.watchedStores.addWatched(this.data.detail)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      this.props.watchedStores.removeWatched(this.data.detail)
      wx.showToast({
        title: '移除成功',
        icon: 'success',
        duration: 1000
      })
    }
  },
  goToOut: function(e) {
    var url = e.currentTarget.dataset.sampleLink
    wx.navigateTo({
      url: '/pages/outWeb/outWeb?playUrl=' + url
    })
  },
  goToTag: function(e) {
    var tagName = e.currentTarget.dataset.tagName
    wx.navigateTo({
      url: '/pages/tagDetail/tagDetail?tag=' + tagName
    })
  },
  goToTrailer: function(e) {
    var id = e.currentTarget.dataset.videoId
    wx.navigateTo({
      url: '/pages/trailer/trailer?id=' + id + '&trailers=' + JSON.stringify(this.data.detail.trailers)
    })
  },
  goToMember: function(e) {
    var id = e.currentTarget.dataset.memberId
    wx.navigateTo({
      url: '/pages/personDetail/personDetail?id=' + id
    })
  },
  sliceTag: function(tag) {
    var reg = /[\u4e00-\u9fa5a-z0-9]+/ig
    return tag.match(reg)
  },
  removeAlikeMovie: function(list, id) {
    var res = []
    list.forEach(item => {
      if (item.id !== id) {
        res.push(item)
      }
    })
    return res
  },
  selectItem: function(e) {
    var id = e.currentTarget.dataset.movieId
    var tag = e.currentTarget.dataset.tagName
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id=' + id + '&tag=' + tag
    })
  },
  goToReviews: function(e) {
    var id = e.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '/pages/reviews/reviews?id=' + id
    })
  },
  goToInterests: function(e) {
    var id = e.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '/pages/interests/interests?id=' + id
    })
  },
  goToForumTopics: function(e) {
    var id = e.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '/pages/forumTopics/forumTopics?id=' + id
    })
  }
}))
