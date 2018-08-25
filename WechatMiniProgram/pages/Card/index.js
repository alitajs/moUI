const app = getApp();
Page({
  data: {
    listA: ['List', 'Button', 'Input', 'Dropdown', 'Panel', 'Modal', 'Collapse', 'Spin'],
    listB: ['Preview'],
    listC: ['Modal', 'Overview'],
    visited: {}
  },
  onLoad: function () {
    let visited = {};
    let Card = app.globalData.visited.Card;
    for (let component in Card) {
      visited[component] = Card[component];
    }
    this.setData({ visited });
  },
  bindVisit: function ({ currentTarget: { id, dataset: { list, url, visit } } }) {
    if (!visit) {
      let visited = this.data.visited;
      list = list === 'A' ? this.data.listA : list === 'B' ? this.data.listB : this.data.listC;
      visited[list[parseInt(id)]] = true;
      this.setData({ visited });
      app.globalData.visited.Card = visited;
      wx.setStorage({
        key: 'visited',
        data: app.globalData.visited,
        complete: () => {
          wx.navigateTo({ url });
        }
      });
    }
    else { wx.navigateTo({ url }); }
  },
  onShareAppMessage() { }
});