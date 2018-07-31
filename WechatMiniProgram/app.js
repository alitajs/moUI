//app.js
const version = "1.8.0";
App({
  onLaunch: function () {
    wx.getStorage({
      key: 'visited',
      success: res => {
        this.globalData.visited = res.data;
      },
      fail: () => {
        this.globalData.visited = { Base: {}, Card: {} };
      },
      complete: () => {
        if (!(this.globalData.visited.version === version)) {
          for (let name in this.globalData.visited) {
            for (let key in this.globalData.update[name]) {
              let component = this.globalData.update[name][key];
              this.globalData.visited[name][component] = false;
            }
          }
          this.globalData.visited.version = version;
          wx.setStorage({
            key: 'visited',
            data: this.globalData.visited
          });
        }
      }
    });
  },
  globalData: {
    update: {
      Base: ['Badge'],
      Card: ['Dropdown']
    }
  }
});