Page({
  data: {
    panel: {
      A: [
        { open: true, title: "Title 1" },
        { open: false, title: "Title 2 - Disabled", disabled: true },
        { open: false, title: "Title 3" }
      ],
      B: [
        { open: false, title: "Title 1" },
        { open: false, title: "Title 2" },
        { open: false, title: "Title 3" }
      ],
      C: [
        { open: false, title: "圆角 - 本页" },
        { open: false, title: "边距" }
       ],
      D:[
        { open: false, title: "Title 1" },
        { open: false, title: "Title 2" }
      ],
      E: [
        { open: false, title: "Title 1" },
        { open: false, title: "Title 2" }
      ]
    },
    borderRadius: 0,
    collapseMargin: 16
  },
  bindOpenPanel: function ({ currentTarget: { id, dataset: { key } } } = {}) {
    console.log("Panel " + key + " " + id + " changed.");
    let str = "panel." + key + "[" + id + "].open";
    this.setData({
      [str]: !this.data.panel[key][id].open
    });
  },
  changeBorderRadius: function ({ detail: { value } } = {}) {
    this.setData({
      borderRadius: value
    });
  },
  changeCollapseMargin: function ({ detail: { value } } = {}) {
    this.setData({
      collapseMargin: value
    });
  },
  onShareAppMessage() { }
});