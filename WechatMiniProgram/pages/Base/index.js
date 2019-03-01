var app = getApp();
Page({
  data: {
    list: ['List', 'Flex', 'Button', 'Switch', 'Loading', 'Progress', 'Toptips', 'Input', 'Batch', 'Preview', 'Navbar', 'Menu', 'Footer', 'Searchbar', 'Badge'],
    visited: {}
  },
  onLoad: function () {
    var visited = {};
    var Base = app.globalData.visited.Base;
    for (var component in Base) {
      visited[component] = Base[component];
    }
    this.setData({
      visited: visited
    });
  },
  bindVisit: function (e) {
    if (!e.currentTarget.dataset.visit) {
      var visited = this.data.visited;
      visited[this.data.list[parseInt(e.currentTarget.id)]] = true;
      this.setData({
        visited: visited
      });
      app.globalData.visited.Base = visited;
      wx.setStorage({
        key: 'visited',
        data: app.globalData.visited,
        complete: function () {
          wx.navigateTo({
            url: e.currentTarget.dataset.url
          });
        }
      });
    }
    else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });
    }
  },
  onShareAppMessage() { }
});