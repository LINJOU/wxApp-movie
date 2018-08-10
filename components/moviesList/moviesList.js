Component({
  data: {
    starSize: 24
  },
  properties: {
    moviesList: {
      type: Array,
      value: []
    },
    delete: {
      type: Boolean,
      value: false
    },
    loadingShow: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    scrolltolower: function() {
      this.triggerEvent('lower')
    },
    selectItem: function(e) {
      var id = e.currentTarget.dataset.movieId
      var tag = e.currentTarget.dataset.movieTag
      wx.navigateTo({
        url: '/pages/movieDetail/movieDetail?id=' + id + '&tag=' + tag
      })
    },
    deleteItem: function(e) {
      var id = e.currentTarget.dataset.deleteId
      this.triggerEvent('deleteOne', id)
    }
  }
})