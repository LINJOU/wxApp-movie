const LENGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'

Component({
  properties: {
    size: {
      type: Number,
      value: 0
    },
    score: {
      type: Number,
      value: 0
    }
  },
  data: {
    itemClasses: []
  },
  methods: {
    getStarList: function() {
      var result = []
      var score = Math.floor(this.data.score * 2) / 4
      // 判断score是否为整数
      var hasDecimal = score % 1 !== 0
      // 处理全星
      var integer = Math.floor(score)
      // 遍历全星
      for (var i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 处理半星
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 补全
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  attached: function() {
    this.setData({
      itemClasses: this.getStarList()
    })
  }
})