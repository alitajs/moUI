import mo from '../../../moui/moui.js';
import icon from '../../../moui/icon.js';
Page({
  data: {
    loading_svg: mo.svg.loading,
    loading: {
      A: false,
      B: false,
      C: false,
      D: false
    },
    load_all: false,
    icon: {
      pdf: icon.pdf,
      word: icon.word
    }
  },
  onLoad: function () {
    console.log(mo.svg.loading);
  },
  bindLoading: function (e) {
    var that = this;
    var str = "loading." + e.target.id;
    this.setData({
      [str]: "LOADING"
    });
    setTimeout(function () {
      that.setData({
        [str]: "SUCCESS"
      });
      setTimeout(function () {
        that.setData({
          [str]: false
        })
      }, 2400);
    }, 2400);
  },
  bindLoadAll: function () {
    var that = this;
    this.setData({
      load_all: true
    });
    var interval = setInterval(function () {
      for (var key in that.data.loading) {
        if (that.data.loading[key]) break;
        if (key === "D") {
          that.setData({
            load_all: false
          });
          clearInterval(interval);
          return true;
        }
      }
    }, 200)
    for (var k in this.data.loading) {
      if (!this.data.loading[k]) {
        this.bindLoading({ target: { id: k } });
      }
    }
  },
  onShareAppMessage() { }
})