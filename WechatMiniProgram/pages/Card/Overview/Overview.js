Page({
  data: {
    Overview: {
      panelList: [{
        id: 'panel1', // All id included for children is not essential
        header: 'Overview',
        // bindtap: 'bindtap',
        more: {
          text: 'moreInformation',
          bindtap: 'handleGetMore',
        },
        itemList: [{
          id: 'item1',
          // bindtap: 'bindtap',
          columnList: [{
            id: 'column1',
            title: '5435',
            describe: 'Steps',
            icon: 'thunderblot-fill',
            bindtap: 'bindtap',
          }, {
            id: 'column2',
            title: '123',
            describe: 'Ranks',
            icon: 'flag-fill',
            bindtap: 'bindtap',
          }, {
            id: 'column3',
            title: '203.3',
            describe: 'Kcal',
            icon: 'fire-fill',
            bindtap: 'bindtap',
          }]
        }]
      }]
    },
  },
  onShareAppMessage() { }
});