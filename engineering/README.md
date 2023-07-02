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

配置方法

```js
module.exports = grunt => {
  grunt.initConfig({
    bar: 123  // 这个值可以在其他任务中直接拿到
  })
}
```

#### 使用插件

```js
module.exports = grunt => {
  grunt.initConfig({
    clean: {
      temp: "temp/**"
    }
  })

  // 加载插件
  grunt.loadNpmTasks('grunt-contrib-clean')
}

```


#### 常用的插件

1. sass

需要安装的依赖: `sass` 、`grunt-sass`

```js

const sass = require('sass')

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/sass/main.scss'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-sass')
}

```

2. babel

需要的依赖 grunt-babel  @babel/core  @babel/preset-env

```js
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')


module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/sass/main.scss'
        }
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          "dist/js/main.js": "src/js/main.js"
        }
      }
    },
    watch: {
      js: {
        files: ["src/js/main.js"],
        tasks: ['babel'],
      },
      sass: {
        files: ["src/sass/*.scss"],
        tasks: ['sass']
      }
    }
  })

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt)

  // 定个默认任务，先执行默认的打包，然后再watch
  grunt.registerTask('default', ['babel', 'sass', 'watch'])
}

```
### Gulp

`pnpm add gulp`

启动文件`gulpfile.js`

#### 基本使用

通过在文件中导出函数

```js
exports.foo = (done) => {
  console.log('foo task working~')
  // 标记任务完成
  done()
}

```

运行`pnpm gulp foo`

#### 组合任务

可以组合多个任务，选择串行执行或者并行执行

```js
const { series, parallel } = require("gulp")

const foo = done => {
  setTimeout(() => {
    console.log('foo')
    done()
  })
}

const bar = done => {
  setTimeout(() => {
    console.log('bar')
    done()
  }
  )
}

// 串行任务
exports.test = series(foo, bar)

// 并行任务
exports.test2 = parallel(foo, bar)

```

#### 异步任务

```js
// 回调的方式
exports.callback = done => {
  console.log(111)
  done()
}

// promise
exports.promise = () => {
  console.log(123)
  return Promise.resovle()
}

// async await 
exports.async = async () => {
  await asyncFunc(111)
  console.log(1211)
}
```

#### 构建过程核心工作原理

工作原理就是读取源文件，通过去掉空格等方式，压缩代码，然后写入新的文件中

例子：
```js
const fs = require("fs")
const { Transform } = require('stream')

exports.stream = () => {
  // 读取文件
  const readStream = fs.createReadStream('./normalize.css')

  // 写入文件
  const writeStream = fs.createWriteStream("./normalize.min.css")

  // 转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // chunk => 读取流中读取到的内容 （buffer）
      const input = chunk.toString()
      const output = input.replace(/\s+/g, "").replace(/\/\*.+?\*\//g, "")
      callback(null, output)
    }
  })

  // 将读取出来的文件写入新文件，要经过转换流
  readStream.pipe(transform).pipe(writeStream)
  return writeStream
}

```

#### gulp文件操作

通过api+插件

```js
const { src, dest } = require("gulp")
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = () => {
  // 使用src读取文件流，使用dest输出文件流
  return src('./*.css')
  .pipe(cleanCss()) // 压缩文件
  .pipe(rename({extname: ".min.css"})) // 重命名
  .pipe(dest('dist'))
}

```

#### 实战-打包一个项目

##### 打包sass

首先要安装gulp-sass

`pnpm add gulp-sass -D`

编写构建代码

```js
const {src, dest} = require('gulp')
const sass = require('gulp-sass')
function style() {
  return src("src/assets/style/*.scss", {base: "src"}) // 输出目录按照原来的src里面的目录
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(dest("dist"))
}

export.modules = {
  style
}
```

##### 打包脚本文件

要安装以下插件

`pnpm add gulp-babel @babel/core @babel/preset-env -D`

```js
const babel = require("gulp-babel")
const scripts = () => {
  return src("src/assets/scripts/*.js", {base:"src"})
    .pipe(babel({preset: ["@babel/preset-env"]}))
    .pipe(dest("dist"))
}
```

##### 编译模板

`pnpm add gulp-swig -D`

```js
// 编译模板
const page = () => {
  return src("src/*.html", { base: "src" })
    .pipe(swig({ data })) // data是定义一些配置数据
    .pipe(dest("dist"))
}
```

##### 压缩图片和字体

`pnpm add gulp-imagemin -D`

```js
const image = () => {
  return src("src/assets/images/**", {base: "src"})
    .pipe(imagemin())
    .pipe(dest("dist"))
}

```

##### public及自动删除dist

public直接复制过去即可

自动删除需要安装依赖
`pnpm add del -D`

```js
const { series } = require("gulp")
const del = require("del")

const clean = () => {
  return del("dist")
}

const build = series(clean, paraller())  // 先执行clean，再执行重新打包的任务
```
