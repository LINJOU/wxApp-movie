Component({
  properties: {
    actorList: {
      type: Array,
      value: []
    }
  },
  methods: {
    selectItem: function(e) {
      var id = e.currentTarget.dataset.actorId
      console.log(id)
      wx.navigateTo({
        url: '/pages/personDetail/personDetail?id=' + id
      })
    },
    deleteItem: function(e) {
      var id = e.currentTarget.dataset.deleteId
      this.triggerEvent('deleteOne', id)
    }
  }
})