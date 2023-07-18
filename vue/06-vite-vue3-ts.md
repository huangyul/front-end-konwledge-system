# vite vue3 ts 项目开发

## 项目搭建

项目src定制

├─api
├─assets
├─components
├─composables
├─layout
├─plugins
├─router
├─store
├─utils
└─views

### ESlint 基础配置

安装eslint`pnpm add eslint -D`

初始化`npx eslint --init`

在package.json加入使用脚本

```json
{
  "srcipts": {
    "lint": "eslint ./src/**/*.{js,jsx,vue,ts,tsx} --fix"
  }
}
```

**与编辑器集成**
