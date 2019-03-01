Page({
  data: {
    tips_warn: false,
    tips_primary: false,
    tips_with_cancel: false,
    tips_with_handle: false,
  },
  bindShowTopTips: function (e) {
    this.setData({
      [e.target.id]: true
    });
    setTimeout(() => {
      this.setData({
        [e.target.id]: false
      });
    }, 3000);
  },
  bindSwitchTipsWithCancel: function() {
    this.setData({
      tips_with_cancel: this.data.tips_with_cancel ? false : true
    });
  },
  bindSwitchTipsWithHandle: function () {
    this.setData({
      tips_with_handle: this.data.tips_with_handle ? false : true
    });
  },
  onShareAppMessage() { }
});