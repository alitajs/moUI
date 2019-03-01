Page({
  data: {
    focus: [false, false, false]
  },
  bindFocus: function ({ currentTarget: { id } } = {}) {
    let str = "focus[" + id + "]";
    this.setData({
      [str]: true
    });
  },
  bindBlur: function ({ currentTarget: { id } } = {}) {
    let str = "focus[" + id + "]";
    this.setData({
      [str]: false
    });
  },
  onShareAppMessage() { }
});