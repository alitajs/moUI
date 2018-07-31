Page({
  data: {
    hide: [true, true, true, true, true, true, true]
  },
  bindShowTotal: function ({ currentTarget: { id } }) {
    console.log("Show Total " + id + ".");
    let str = "hide[" + id + "]";
    this.setData({
      [str]: false
    });
    setTimeout(() => {
      console.log("Hide Total " + id + ".");
      this.setData({
        [str]: true
      });
    }, 1500);
  },
  bindShowModal: function ({ currentTarget: { id } }) {
    console.log("Show Modal " + id + ".");
    let str = "hide[" + id + "]";
    this.setData({
      [str]: false
    });
  },
  bindHideModal: function ({ target: { id } }) {
    if (!!id) {
      console.log("Hide Modal " + id + ".");
      let str = "hide[" + id + "]";
      this.setData({
        [str]: true
      });
    }
  },
  onShareAppMessage() { }
});