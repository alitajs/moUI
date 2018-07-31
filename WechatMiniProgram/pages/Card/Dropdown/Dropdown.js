Page({
  data: {
    dropdown: {
      A: [
        { open: false, items: ['dropdown item 1', 'dropdown item 2', 'dropdown item 3'] },
        { open: false, items: ['dropdown item 1', 'dropdown item 2', 'dropdown item 3'] },
        { open: false, items: ['dropdown item 1', 'dropdown item 2', 'dropdown item 3'] }
      ],
      B: [
        { open: false, desc: 'size', select: false, items: ['Small', 'Default', 'Large'] },
        { open: false, desc: 'color', select: false, items: ['Red', 'Blue', 'Green'] }
      ],
      C: [
        { open: false, desc: '省份', select: false, items: ['北京市', '湖南省'] },
        {
          open: false, desc: '城市', select: false,
          items: { 北京市: ['海淀区', '西城区'], 湖南省: ['长沙市', '石门县'] }
        }
      ]
    }
  },
  bindDropdown: function ({ currentTarget: { id, dataset: { key } } }) {
    console.log("Dropdown change: key-" + key + " id-" + id);
    let dropdown = this.data.dropdown;
    for (let k in dropdown[key]) {
      if (k == id) { dropdown[key][k].open = !dropdown[key][k].open; }
      else { dropdown[key][k].open = false; }
    }
    this.setData({ dropdown });
  },
  bindSelect: function ({ currentTarget: { dataset: { key, item, select } } }) {
    let dropdown = this.data.dropdown;
    if (key === "C" && !(dropdown[key][item].select === select)) {
      for (let k in dropdown[key].slice(item + 1)) {
        dropdown[key][parseInt(k) + item + 1].select = false;
      }
    }
    dropdown[key][item].open = false;
    dropdown[key][item].select = select;
    console.log("Dropdown select: key-" + dropdown[key][item].desc + " value-" + select);
    this.setData({ dropdown });
  },
  onShareAppMessage() { }
});