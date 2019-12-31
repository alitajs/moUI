# moUI

🍕 面向现代浏览器的 CSS 样式库。

## 特性

- 原生 CSS 编写
- 深浅色主题与风格定制
- 按需载入国际化文案
- 多框架支持 (**help wanted!**)

## 本地预览

### 微信小程序

1. Clone 项目到本地，进入 `wechat-minip` 目录，执行命令安装依赖：

```bash
cd wechat-minip && yarn install
# or
cd wechat-minip && npm install
```

2. 在 `wechat-minip` 目录下编译：

```bash
yarn run compile
# or
npm run compile
```

3. 安装并打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，登录后在项目列表页选择导入小程序项目，选中 `wechat-minip` 目录。

> 如果开发者工具提示“不属于项目成员”，删除 `wechat-minip/project.config.json` 中的 `appid` 项再以游客身份重新导入项目。

![import wechat mini-program project](https://user-images.githubusercontent.com/32428655/71554841-94818f80-2a5f-11ea-9340-f0e2252611bc.png)
