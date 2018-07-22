Page({
  data: {
  },
  loading_A: function () {
    this.setData({
      loading_A: true
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        loading_A: false
      });
    }, 10000);
  },
  loading_B: function () {
    this.setData({
      loading_B: true
    });
    var that = this;
    setTimeout(function () {
      that.setData({
        loading_B: false
      });
    }, 10000);
  },
  onShareAppMessage(){}
});