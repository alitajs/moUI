# moUI

## 用法

逐渐支持template。

例如：
```wxml
<import src='./path/to/card.wxml' />
<template is='Modal' data='{{...Modal}}' />
<template is='Toast' data='{{...Toast}}' />
```

```javascript
import { Modal } from './path/to/card.js';
Page({
  ...
  networkErr: function () {
    Modal.showModal.bind(this)({
      mask: true,
      title: '无网络',
      okText: '确认',
      maskClosable: true,
      onOk: 'handleNetworkErr',
      onCancel: 'handleCancel',
      content: '网络似乎出了点问题，请检查后重试',
    });
  },
  ...
  handleCancel: function (e) { Modal.hideModal.bind(this)({ e }) },
  ...
  serverErr: function () {
    Modal.showToast.bind(this)({
      duration: 2000,
      icon: 'ICON_TYPE',
      iconColor: '#1890ff',
      title: '服务器竟然崩溃了，请稍后再试',
    });
  },
  ...
});
```

## 预览

__微信小程序__

![moUI微信小程序](https://raw.githubusercontent.com/mofong/moUI/master/Preview/wxacode.jpg)

### Base

![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/List.jpg)
![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Switch.jpg)
![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Loading.jpg)

![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Progress.jpg)
![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Toptips.jpg)
![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Input.gif)

![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Batch.gif)
![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Preview.jpg)
![moUI - Base](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Base/Searchbar.jpg)


### Card

![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/index.jpg)
![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/List.jpg)
![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/Dropdown_0.jpg)

![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/Dropdown_1.jpg)
![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/Panel_0.jpg)
![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/Panel_1.jpg)

![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/Modal.jpg)
![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/Collapse.gif)
![moUI - Card](https://raw.githubusercontent.com/mofong/moUI/master/Preview/Card/Preview.jpg)
