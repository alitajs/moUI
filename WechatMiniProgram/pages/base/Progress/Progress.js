import mo from '../../../moui/moui.js';
import icon from '../../../moui/icon.js';
Page({
  data: {
    progress_circle_A: false,
    progress_circle_B: false,

    menu_progressing: false,
    menu_progress_mode: true,
    mini_progress: false,

    progress_A: 0,
    progress_B: 0,
    menu_progress: 0,

    progressing_img_A: mo.svg.progressing,
    progressing_img_B: mo.svg.progressing,

    download_all: false,

    icon: {
      zip: icon.zip,
      movie: icon.movie
    }
  },
  onShow: function () {
    setTimeout(() => {
      this.setData({
        menu_progress_mode: false
      });
    }, 1200)
  },
  bindProgressCircle_A: function () {
    var that = this;
    if (this.data.progress_A >= 100) {
      setTimeout(function () {
        that.setData({
          progress_A: 0,
          progress_circle_A: false
        });
      }, 4500);
      return true;
    }
    this.setData({
      progress_circle_A: true,
      progress_A: this.data.progress_A + 2
    });
    mo.thisProgressing.call(this, { progress: this.data.progress_A, imageVar: "progressing_img_A" });
    setTimeout(function () {
      that.bindProgressCircle_A();
    }, 40);
  },
  bindProgressCircle_B: function () {
    var that = this;
    if (this.data.progress_B >= 100) {
      setTimeout(function () {
        that.setData({
          progress_B: 0,
          progress_circle_B: false
        });
      }, 2400);
      return true;
    }
    this.setData({
      progress_circle_B: true,
      progress_B: this.data.progress_B + 2
    });
    mo.thisProgressing.call(this, { progress: this.data.progress_B, imageVar: "progressing_img_B" });
    setTimeout(function () {
      that.bindProgressCircle_B();
    }, 80);
  },
  bindDownloadAll: function () {
    var that = this;
    this.setData({
      download_all: true
    });
    var interval = setInterval(function () {
      if (!(that.data.progress_circle_A || that.data.progress_circle_B)) {
        that.setData({
          download_all: false
        });
        clearInterval(interval);
        return true;
      }
    }, 200)
    if (!this.data.progress_circle_A) {
      this.bindProgressCircle_A();
    }
    if (!this.data.progress_circle_B) {
      this.bindProgressCircle_B();
    }
  },
  bindChangeMenuMode: function () {
    console.log("菜单栏" + (this.data.menu_progress_mode ? "不" : "") + "显示进度条.");
    this.setData({
      menu_progress_mode: this.data.menu_progress_mode ? false : true
    });
  },
  bindChangeSize: function () {
    console.log("更改进度条大小.");
    this.setData({
      menu_progress_mode: true,
      mini_progress: this.data.mini_progress ? false : true
    });
  },
  bindProgress: function () {
    var that = this;
    if (this.data.menu_progress >= 100) {
      setTimeout(function () {
        that.setData({
          menu_progress: 0,
          menu_progressing: false
        });
      }, 2400);
      return true;
    }
    this.setData({
      menu_progressing: true,
      menu_progress: this.data.menu_progress + 0.25
    });
    setTimeout(function () {
      if (that.data.menu_progressing) {
        that.bindProgress();
      }
      else return true;
    }, 20);
  },
  bindMenuSelect: function () {
    this.data.menu_progressing ? wx.showActionSheet({
      itemList: ["暂停", "取消进程"],
      itemColor: "#353535",
      success: res => {
        if (res.tapIndex) {
          this.setData({
            menu_progressing: false,
            menu_progress: 0
          });
        }
        else {
          this.setData({
            menu_progressing: false
          });
        }
      }
    }) : wx.showActionSheet({
      itemList: ["继续", "取消进程"],
      itemColor: "#353535",
      success: res => {
        if (res.tapIndex) {
          this.setData({
            menu_progressing: false,
            menu_progress: 0
          });
        }
        else {
          this.bindProgress();
        }
      }
    });
  },
  onShareAppMessage() { }
});