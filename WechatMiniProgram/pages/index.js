const app = getApp();
Page({
  data: {
    list: [{
      name: "Base",
      version: "V 1.1.0",
      icon: "icon-app-store-fill",
    }, {
      name: "Card",
      version: "V 0.8.0",
      icon: "icon-card-fill",
    }, {
      name: "Material",
      version: "V 0.1.0",
      icon: "icon-card-fill",
    }]
  },
  onShareAppMessage() { }
});