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
