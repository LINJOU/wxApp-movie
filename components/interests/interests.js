Component({
  data: {
    interests: []
  },
  properties: {
    interestsList: {
      type: Array,
      value: [],
      observer: function(newVal) {
        newVal.forEach(item => {
          for (var key in item) {
            if (key === 'create_time') {
              item.create_time = this.getDate(item.create_time)
            }
          }
        })
        this.setData({
          interests: newVal
        })
      }
    },
    loadingShow: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    getDate: function(time) {
      var now = new Date()
      var date = time.split(' ')[0].split('-')
      var y = now.getFullYear() - date[0]
      var m = now.getMonth() + 1 - this.removeZero(date[1])
      var d = now.getDate() - this.removeZero(date[2])
      if (y > 0) {
        return y + '年前'
      }
      if (m > 0) {
        return m + '月前'
      }
      if (d > 0) {
        if (d === 1) {
          return '昨天'
        } else {
          return d + '天前'
        }
      } else {
        if (d === 0) {
          return '今天'
        }
      }
    },
    removeZero: function(num) {
      var index = num.indexOf('0')
      if (index !== 0) {
        return num
      } else {
        return num.slice(1)
      }
    }
  }
})