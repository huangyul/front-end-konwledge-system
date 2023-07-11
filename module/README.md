# 模块化

## 发展历史

一开始`node`首先提出了`commonjs`，是使用同步的方式，所以不适合浏览器，浏览器就提出了`AMD`（代表着`requirejs`）,后面又出了`CMD（sea.js）`，使用`commonjs`的方式实现`requirejs`，现代基本采用`ES modules`


## ES module

### 导出基本特点

- 自动采用严格模式
- 每个`esm`都是独立的模块，里面的变量属性都是私有的
- `esm`通过`cros`请求`js文件`，所以可能会有跨域的问题
- `esm`的`script`标签会延迟执行，相等于`defer` 

### 几个注意事项

1. `export { name }` 这种是固定写法，而不是导出一个对象字面量
2. esm导出的是变量的引用，而commonjs是变量的复制
3. esm导出的变量是只读的，不可重写变量的值

### 导入基本特点

1. `form`后面的路径要完整
2. 需要异步导入时，使用`import('./xxx.js')`，返回的是promise
3. 当一个文件既导出具名变量，又导出默认变量，可以这样导入`import title, {name, age} from "./xxx.js"`或`import {name, age, default as title} from "./xxx.js"`

### 直接导出导入的值

```export {name, age} from './sss.js'```

### polyfill

可以通过引用一个js文件解决esm在低版本浏览器不兼容的问题```browser-es-module-loader```

### commonjs与ESM

1. esm中可以导入comminjs
2. commonjs不可以导入esm
3. commonjs导出的是一个默认对象
4. import不是解构对象导出

# Webpack

## 使用

安装webpack `yarn add webpack webpack-cli -D`
执行webpack `yarn webpack`

## 配置文件

在根目录下新建`webpack.config.js`

以下是简单的配置，指定了入口文件和输出文件

```js
// webpack.config.js
const path = require('path')

module.exports = {
  // 指定入口文件
  entry: "./src/index.js",
  // 指定模式
  mode: "development", // production none
  // 指定输出目录
  output: {
    path: path.resolve(__dirname, 'dist2'),
    filename: 'bundler.js'
  }
}
```

## 资源加载

`webpack`默认只能加载`javascript`资源文件，所以其他的资源文件需要使用相应的`loader`实现

### css

要处理`css`文件，需要安装两个`loader`

- `css-loader`：将`css`文件转为返回字符串的一个`js`函数
- `style-loader`：将`css-loader`返回的函数新建一个`style`标签插入`document`中

```js
// index.js
import "./main.css"

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

### 文件资源

要处理文件资源，需要使用`file-loader`，该加载器会将匹配到的文件进行打包，还可配合`url-loader`使用，可以将文件转为base64，从而减少请求的次数，但是相应的也会增加打包后文件的体积

```js
{
  test: /.png$/,
  use: {
    loader: 'url-loader',
    limit: 10 * 1024 // 超过10k就使用file-loader
  }
}
```

### 处理js

使用babel-loader

```js
{
  test: /.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}
```

### 加载html中的资源

使用html-loader

```js
{
  test: /.html$/,
  usr: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'a:href']
    }
  }
}
```

## 开发loader

loader的工作原理很像管道传输，最后loader一定要返回js语句

现在实现一个markdown的loader

```js
// markdown-loader
module.exports = source => {
  return `export default ${JSON.stringify(source)}`
}
```

## 插件

增强自动化的能力

### 自动删除dist目录

clean-webpack-plugin

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

plugins: [
  new CleanWebpackPlugin()
]
```

### 自动生成模板文件

这样文件路径的引用可以根据生成的js文件生成

html-webpack-plugin

copy-webpack-plugin 复制目录

### 开发一个webpack插件

使用钩子机制

```js

```
