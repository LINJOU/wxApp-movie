Component({
  data: {
    query: ''
  },
  properties: {
    focus: {
      type: Boolean,
      value: false
    },
    outQuery: {
      type: String,
      value: '',
      observer: function(newVal, oldVal) {
        this.setData({
          query: newVal
        })
      }
    }
  },
  methods: {
    bindKeyCode: function() {
      this.triggerEvent('postQuery', this.data.query)
    },
    bindKeyInput: function(e) {
      this.setData({
        query: e.detail.value
      })
    },
    clear: function() {
      this.setData({
        query: ''
      })
    }
  }
})