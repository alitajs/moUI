import icon from '../../../moui/icon.js';
const image_exmaple = require('../../image.js').moui_dark;
Page({
  data: {
    tips_primary: false,
  
    gallery_selecting: false,
    list_selecting: false,
    list_active: {
      A: false,
      B: false,
      C: false,
      D: false
    },
    list_deleted: {
      A: false,
      B: false,
      C: false,
      D: false
    },

    icon: {
      zip: icon.zip,
      movie: icon.movie,
      pdf: icon.pdf,
      word: icon.word
    },
    src: image_exmaple,
    image: []
  },
  onLoad: function () {
    var image = [], i = 16, that = this;
    while (i) {
      image.push({ active: false, deleted: false, hide: false });
      i -= 1;
    }
    this.setData({
      image: image
    });
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          gallery_image_size: res.screenWidth * 16 / 75 + 6
        });
      },
      fail: function(res) {
        wx.showModal({
          title: "错误",
          content: "未获取到屏幕宽度，无法批量操作图片",
          showCancel: true,
          confirmText: "重新加载",
          confirmColor: "#1890ff",
          success: function(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: "/pages/base/Batch/Batch"
              });
            }
          }
        });
      }
    });
  },
  bindSelectMode: function (e) {
    console.log("Longpress target id: " + e.target.id);
    if (!!e.target.id) {
      var str = "image[" + parseInt(e.target.id) + "].active";
      var touches = [e.target.offsetLeft - e.currentTarget.offsetLeft, e.target.offsetTop - e.currentTarget.offsetTop];
      touches[0] -= (parseInt(e.target.id) % 4) * this.data.gallery_image_size;
      touches[1] -= parseInt((parseInt(e.target.id) / 4)) * this.data.gallery_image_size;
      this.setData({
        [str]: true,
        gallery_selecting: true,
        touches: touches,
        gallery_select_start: parseInt(e.target.id)
      });
    }
  },
  bindSelectStart: function (e) {
    console.log("Touch start target id: " + e.target.id);
    if (!!e.target.id && this.data.gallery_selecting) {
      var str = "image[" + parseInt(e.target.id) + "].active";
      this.setData({
        [str]: this.data.image[parseInt(e.target.id)].active ? false : true,
        gallery_select_start: parseInt(e.target.id)
      });
    }
  },
  bindSelectGallery: function (e) {
    if (this.data.gallery_selecting) {
      var moved = parseInt((e.touches[0].pageY - e.currentTarget.offsetTop - this.data.touches[1]) / this.data.gallery_image_size) * 4 + parseInt((e.touches[0].pageX - e.currentTarget.offsetLeft - this.data.touches[0]) / this.data.gallery_image_size);
      moved = moved > 0 ? moved < this.data.image.length ? moved : this.data.image.length - 1 : 0;
      var end = moved, image = this.data.image;
      while (true) {
        if (moved > this.data.gallery_select_start) {
          image[moved].active = !image[moved].active;
          moved -= 1;
        }
        else if (moved < this.data.gallery_select_start) {
          image[moved].active = !image[moved].active;
          moved += 1;
        }
        else {
          this.setData({
            image: image,
            gallery_select_start: end
          });
          break;
        }
      }
    }
  },
  bindGallery: function (e) {
    if (!this.data.gallery_selecting) {
      wx.previewImage({
        current: 'http://cos.sfive.cn/moUI/83de799e81d611e8bb5340a181d611e8.png',
        urls: ['http://cos.sfive.cn/moUI/83de799e81d611e8bb5340a181d611e8.png']
      });
    }
  },
  bindDelete: function () {
    if (this.data.gallery_selecting) {
      var image = this.data.image;
      for (var k in image) {
        image[k].deleted = image[k].active || image[k].deleted;
      }
      this.setData({
        image: image,
        tips_primary: true
      });
      this.bindCancel();
      var that = this;
      setTimeout(function () {
        that.setData({
          tips_primary: false
        });
      }, 3200);
    }
    else if (this.data.list_selecting) {
      var list_active = this.data.list_active;
      var list_deleted = this.data.list_deleted;
      for (var k in list_active) {
        list_deleted[k] = list_active[k] || list_deleted[k];
      }
      this.setData({
        list_deleted: list_deleted
      });
      this.bindCancel();
    }
  },
  bindCancel: function () {
    if (this.data.gallery_selecting) {
      var image = this.data.image;
      for (var k in image) {
        image[k].active = false;
      }
      this.setData({
        image: image,
        gallery_selecting: false
      });
    }
    else if (this.data.list_selecting) {
      this.setData({
        list_selecting: false,
        ["list_active.A"]: false,
        ["list_active.B"]: false,
        ["list_active.C"]: false,
        ["list_active.D"]: false
      });
    }
  },
  bindUndo: function () {
    var image = this.data.image;
    for (var k in image) {
      image[k].hide = false;
      image[k].deleted = false;
      if (k == image.length - 1) {
        this.setData({
          image: image
        });
      }
    }
  },
  bindImageDeleted: function (e) {
    if (this.data.image[e.target.id].deleted) {
      this.setData({
        ["image[" + e.target.id + "].hide"]: true
      });
    }
  },
  bindListSelectStart: function (e) {
    this.setData({
      list_selecting: true,
      ["list_active." + e.currentTarget.id]: true
    });
  },
  bindListSelect: function (e) {
    if (this.data.list_selecting) {
      this.setData({
        list_selecting: true,
        ["list_active." + e.currentTarget.id]: this.data.list_active[e.currentTarget.id] ? false : true
      });
    }
  },
  onShareAppMessage() { }
});