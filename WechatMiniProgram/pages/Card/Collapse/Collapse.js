Page({
  data: {
    panelA: [
      { open: true, title: "Title 1" },
      { open: false, title: "Title 2 - Disabled", disabled: true },
      { open: false, title: "Title 3" }
    ],
    panelB: [
      { open: false, title: "Title 1" },
      { open: false, title: "Title 2" },
      { open: false, title: "Title 3" }
    ],
    panelC: [
      { open: false, title: "圆角 - 本页" },
      { open: false, title: "边距" },
      { open: false, title: "Title 1" },
      { open: false, title: "Title 2" },
      { open: false, title: "Title 1" },
      { open: false, title: "Title 2" }
    ],
    borderRadius: 4,
    collapseMargin: 16
  },
  bindOpenPanelA: function ({ currentTarget: { id } } = {}) {
    console.log("PanelA " + id + " changed.");
    let str = "panelA[" + id + "].open";
    this.setData({
      [str]: !this.data.panelA[id].open
    });
  },
  bindOpenPanelB: function ({ currentTarget: { id } } = {}) {
    console.log("PanelB " + id + " changed.");
    let str = "panelB[" + id + "].open";
    this.setData({
      [str]: !this.data.panelB[id].open
    });
  },
  bindOpenPanelC: function ({ currentTarget: { id } } = {}) {
    console.log("PanelC " + id + " changed.");
    let str = "panelC[" + id + "].open";
    this.setData({
      [str]: !this.data.panelC[id].open
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