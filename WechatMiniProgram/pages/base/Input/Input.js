Page({
  data: {
    tips_primary: false,
    tips_primary_disabled: 0,

    radioItems: [
      { name: 'radio item', value: '0' },
      { name: 'radio item', value: '1', checked: true }
    ],
    checkboxItems: [
      { name: 'checkbox item', value: '0', checked: true },
      { name: 'checkbox item', value: '1' }
    ],

    focus_A: false,
    focus_B: false,
    focus_C: false,
    focus_D: false,
    focus_E: false,
    focus_F: false,
    input_A: false,
    input_B: false,
    input_C: false,
    input_D: false,
    input_E: false,
    input_F: false,

    date: "2018-07-05",
    time: "12:01",

    textarea_length: 0,

    countryCodes: ["+86", "+87", "+88"],
    countryCodeIndex: 0,

    countries: ["中国", "美国", "英国"],
    countryIndex: 0,

    accounts: ["微信一键登录", "moID", "邮箱"],
    accountIndex: 0,

    isAgree: false,

    keyboard: 0
  },
  bindShowTopTips: function (e) {
    this.setData({
      tips_primary: true
    });
    setTimeout(() => {
      this.setData({
        tips_primary: false
      });
    }, 3000);
    var timestamp = Date.parse(new Date()) / 1000 + 30;
    this.setData({
      tips_primary_disabled: 30
    });
    var interval = setInterval(() => {
      if (timestamp >= Date.parse(new Date()) / 1000) {
        this.setData({
          tips_primary_disabled: timestamp - Date.parse(new Date()) / 1000
        });
      }
      else {
        this.setData({
          tips_primary_disabled: 0
        });
        clearInterval(interval);
        return true;
      }
    }, 1000);
  },
  radioChange: function (e) {
    console.log('radio: ', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox: ', e.detail.value);
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code: ', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    });
  },
  bindCountryChange: function (e) {
    console.log('picker country: ', e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    });
  },
  bindAccountChange: function (e) {
    console.log('picker account: ', e.detail.value);
    this.setData({
      accountIndex: e.detail.value
    });
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindFocus: function (e) {
    if (e.currentTarget.id) {
      wx.pageScrollTo({
        scrollTop: e.currentTarget.id > "B" ? 270 : 140
      });
      this.setData({
        ["focus_" + e.currentTarget.id]: true
      });
    }
  },
  bindBlur: function (e) {
    this.setData({
      keyboard: 0,
      ["focus_" + e.target.id]: false,
      ["input_" + e.target.id]: !!e.detail.value ? true : false
    });
    console.log("键盘输入内容：" + e.detail.value);
  },
  bindInput: function (e) {
    this.setData({
      textarea_length: e.detail.value.length,
      input_E: !!e.detail.value ? true : false
    });
  },
  bindClear: function () {
    this.setData({
      clear_E: "",
      focus_E: false,
      input_E: false,
      textarea_length: 0
    });
  },
  onShareAppMessage() { }
});