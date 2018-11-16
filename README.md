# moUI


开始写moUI之前，笔者开发过一款微信小程序，结果被自己团队其他人吐槽太丑，于是下定决心要出一套样式库，为自己创业项目即将开发的n个小程序做准备。大一下学期期末最后一门大物考完后，闭关四天，边学CSS边写出了第一套组件库Base。

写moUI的时候，微信小程序正走在插件化的路上，所以笔者也 __希望moUI不仅仅只是一套样式库__ ，而是多人参与开发、反馈和改进的样式组件库平台，__利用CSS的变量实现库的深度定制，各样式组件库的组件又能组合使用，使得采用这些组件库开发的小程序并不千篇一律__。于是在紧接着暑假小学期，笔者边学ES2015边出了第二套Card。笔者在写前两套样式库时，学习Web开发只四五来个月，大一也并非计算机专业，野生程序猿嘛，写出来的代码多有不规范之处，还望诸位多多见谅。笔者没什么兴趣爱好，唯一算得上、也称得上热爱的，也便只有代码了，对于自己所热爱的，也一定会认真对待、坚持到底。

另外提一下「末坊开放平台」，是笔者目前的一个创业项目，旨在连接大学生及与之相关的人和团体。moUI同时也是平台上为大学生创新创业团队提供的一套开发库，以后也有计划推出其它开发库。moUI的npm可能要等笔者再学学。

__欢迎大家指出源码的Bug或提交新的组件库！小程序交流社区即将上线~__



## 理念

Coming...

## 用法

moJS 用法请前往 https://www.yuque.com/hele/mojs

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
