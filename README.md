# ReadMe client

### 提示:

这是一个 dev 开发分支，用于开发新版本，上个版本的链接在这里 [v0.1.x](https://github.com/Hunlongyu/ReadMe-client/tree/v0.1.x)。

虽然是旧版本，但是功能齐全，可以正常使用。

新版本，会调整界面样式，增加一些新的功能。努力开发中……

### Tool & Repository
* vue-cli 3 + vue-cli-plugin-electron-builder: 重新构建项目
* vue + vue-router + vuex + electron + electron-builder: 项目重构时，自带的全家桶
* axios: http库,获取md文件
* highlight.js: 代码高亮，用于渲染 md 文件里的代码片段高亮
* marked: md 渲染引擎
* modern-normalize: 重置浏览器 css 样式
* nedb: 数据存储
* primer: css 框架，这里主要用于 md 的样式
* vue-notification: 各种提示
* when: 异步库
* vuetify: 语义化的Material组件
* vue-i18n: 多语言

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
