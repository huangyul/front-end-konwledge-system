# 工程化

前端工程化是指在企业级的前端项目开发中，把前端开发所需的工具、技术、流程、经验等进行规范化、标准化，以提高开发效率和质量，降低成本

## 脚手架工具

### Yeoman

通用的脚手架的工具

通过`Yeoman`搭配不同的`generator`，生成不同的`app`项目

#### 原理

##### 基础使用

###### 安装

`npm i yo -g`(也可以使用yarn，pnpm)

###### 找到generator

比如安装node，先安装generator-node

`npm i generator-node -g`

然后安装

`yo node`

## 自动化构建

将我们开发代码自动化转为生产环境的代码

例如开发过程中我们可以使用es6，sass等提高开发效率，然后在打包的过程中将代码转为浏览器可用的代码

### 常用的构建工具

- grunt：构建过程会产生临时文件，有磁盘读写操作，很慢
- gulp：基于内存，速度快
- fis：百度出品，比较全，适合初学者

### Grunt

#### 基本使用

安装`pnpm add -D grunt`

定义入口文件`gruntfile.js`

```js
module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('foo')
  })
}
```

此时执行命令: `pnpm grunt foo`，就会打印出`"foo"`

更多用法

```js
module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('foo')
  })

  // default 是默认，及不需要加名称，后面的数组是一并调用注册了的任务
  grunt.registerTask('default', ['foo'], () => {
    console.log('default')
  })

  // 如果是异步的，需要拿到this.async方法返回的回调方法，然后在异步执行后执行
  grunt.registerTask('async-task', function() {
    const done = this.async()
    setTimeout(() => {
      console.log('sync function done')
      done()
    }, 1000)
  })
}

```
