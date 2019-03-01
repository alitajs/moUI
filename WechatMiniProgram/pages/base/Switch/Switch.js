Page({
  data: {
    switch_A: true,
    switch_B: true,
    switch_C: false,
    switch_A_disabled: false,
    switch_B_disabled: false
  },
  bindSwitch: function (e) {
    console.log("Switch " + e.currentTarget.id + " to " + (this.data["switch_" + e.currentTarget.id] ? "False." : "True."));
    var str = "switch_" + e.currentTarget.id;
    this.setData({
      [str]: this.data["switch_" + e.currentTarget.id] ? false : true
    });
  },
  bindSwitchDisabled: function () {
    console.log("Switch C to " + (this.data.switch_C ? "False" : "True") + ", switch A & B is " + (this.data.switch_C ? "able." : "disable."));
    this.setData({
      switch_C: this.data.switch_C ? false : true,
      switch_A_disabled: this.data.switch_C ? false : true,
      switch_B_disabled: this.data.switch_C ? false : true
    });
  },
  onShareAppMessage() { }
});