const LENGTH = 60

Component({
  data: {
    text: '',
    longContent: '',
    hasMore: false
  },
  properties: {
    content: {
      type: String,
      value: '',
      observer: function(newVal) {
        this.getContent(newVal)
      }
    }
  },
  methods: {
    hiddenContent: function(str) {
      var short = str.slice(0, LENGTH - 1) + '...'
      this.setData({
        text: short,
        longContent: str,
        hasMore: true
      })
    },
    getContent: function(str) {
      if (str.length > LENGTH) {
        this.hiddenContent(str)
      } else {
        this.setData({
          text: str,
          hasMore: false
        })
      }
    },
    showMoreContent: function() {
      var content = this.data.longContent
      this.setData({
        text: content,
        hasMore: false
      })
    }
  }
})