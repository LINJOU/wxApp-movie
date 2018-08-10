Component({
  properties: {
    switches: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    selectIndex: function(e) {
      var index = e.currentTarget.dataset.switchIndex
      if (this.data.currentIndex === index) {
        return
      }
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('getIndex', index)
    }
  }
})