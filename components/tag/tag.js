Component({
  data: {
    tagList: [
      {text: '经典'},
      {text: '冷门佳片'},
      {text: '豆瓣高分'},
      {text: '动作'},
      {text: '喜剧'},
      {text: '爱情'},
      {text: '悬疑'},
      {text: '恐怖'},
      {text: '科幻'},
      {text: '治愈'},
      {text: '文艺'},
      {text: '成长'},
      {text: '动画'},
      {text: '华语'},
      {text: '欧美'},
      {text: '韩国'},
      {text: '日本'}
    ]
  },
  methods: {
    selectItem: function(e) {
      var tagName = e.currentTarget.dataset.tagName
      wx.navigateTo({
        url: '/pages/tagDetail/tagDetail?tag=' + tagName
      })
    }
  }
})