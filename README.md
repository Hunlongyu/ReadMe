# ReadMe client

> Github 上有很多好的开源项目，点击 start 关注后，却由于无法分类而杂乱不堪。一些 Javascript 库，一般会在 README.md 里介绍使用方法。该软件则可以实现收集、整理、查看。


## 具体功能：

一、 添加

可以通过模糊搜索，和精确搜索，在搜索结果里选择要添加的项目。

二、搜索

通过实时搜索，显示本地已存在的项目。

三、分类

通过标签的方式，进行分类。

## 技术栈：

```
electron + vue + nedb
```

## 规划：

- [x] 学习 VUE
- [x] 学习 Electron
- [x] 详细整理需要实现的功能
- [x] 寻找相关插件
- [x] 开始界面布局
- [ ] 开始逻辑部分
- [ ] 第一版上线，提供下载试用。
- [ ] 修复 BUG
- [ ] 重新界面布局
- [ ] 代码重构
- [ ] 第二版上线
- [ ] 修复 BUG
- [ ] 添加小功能
- [ ] 一直维护……


## 构建：

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:9080
yarn run dev

# build electron application for production
yarn run build


# lint all JS/Vue component files in `src/`
yarn run lint

```