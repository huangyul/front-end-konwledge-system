# 规范化

## ESLint

### 安装

`yarn add eslint -D`

查看版本

`yarn eslint --version`

## 快速上手

首先要配置eslint

`yarn eslint --init`

然后会执行一些配置问题

执行eslint

`yarn eslint xx/index.js`

使用eslint修复样式问题

`yarn eslint index.js --fix`

## 配置文件

```js
module.exports = {
  env: { // 可以理解为每个都是一个集合，是否允许使用集合里面的全局方法和属性
    browser: false,
    es2021: true
  },
  extends: 'standard', // 拓展
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: { // 指定ecma版本
    ecmaVersion: 'latest'
  },
  rules: {
    'no-alert': 'error'
  }
}

```

## 配置注释

可以使用注释忽略eslint

```js
// 单行注释
const a = 1 // eslint-disable-line


```
