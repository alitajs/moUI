Page({
  data: {
    input: "",
    width: 100,
    focus: false,
    search_result: []
  },
  changeWidth: function (e) {
    this.setData({
      width: e.detail.value
    });
  },
  bindClear: function () {
    this.setData({
      input: "",
      search_result: []
    });
  },
  bindInput: function (e) {
    this.setData({
      input: e.detail.value,
      search_result: [0, 1, 2, 3, 4].slice(0, e.detail.value.length)
    });
  },
  onShareAppMessage() { }
});