# 组件库开发

## 快速原型开发

`yarn add -g @vue/cli-service-global`

指定在加载的组件

`vue serve ./src/login.vue`

## Monorepo

单仓库多项目管理

配置`package.json`

```json
{
  "workspace": ["packages/*"]
}
```

新建`packages/button`

文件结构为
│  index.js
│
├─src
│      button.vue
│
└─__test__

- src: 源代码
- __test__: 单元测试
- index.js: 打包入口文件
- dist: 打包后的文件
