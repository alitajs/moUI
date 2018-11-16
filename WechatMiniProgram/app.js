//app.js
const version = "1.9.0";
App({
  onLaunch: function () {
    wx.getStorage({
      key: 'visited',
      success: ({ data }) => {
        this.globalData.visited = data;
      },
      fail: () => {
        this.globalData.visited = { Base: {}, Card: {} };
      },
      complete: () => {
        if (this.globalData.visited.version !== version) {
          for (let name in this.globalData.visited)
            for (let key in this.globalData.update[name]) {
              let component = this.globalData.update[name][key];
              this.globalData.visited[name][component] = false;
            }
          this.globalData.visited.version = version;
          wx.setStorage({
            key: 'visited',
            data: this.globalData.visited,
          });
        }
      }
    });
  },
  onShow: function () {
    wx.loadFontFace({
      family: 'iconfont',
      source: 'url("//at.alicdn.com/t/font_915540_lt936zoen4r.woff")',
    });
  },
  globalData: {
    update: {
      Base: [],
      Card: ['Spin', 'Overview', 'Modal'],
    }
  }
});