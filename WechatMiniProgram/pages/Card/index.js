const app = getApp();
Page({
  data: {
    listA: ['List', 'Button', 'Input', 'Dropdown', 'Panel', 'Modal', 'Collapse'],
    listB: ['Preview'],
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
      list = list === 'A' ? this.data.listA : this.data.listB;
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