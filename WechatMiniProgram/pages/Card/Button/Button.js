Page({
  data: {
    loading: false
  },
  bindLoading: function () {
    this.setData({
      loading: true
    });
    setTimeout(() => {
      this.setData({
        loading: false
      });
    }, 10000);
  },
  onShareAppMessage() { }
});