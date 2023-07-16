# vue-router

## 基础

history注意事项：
配置了history模式

node：
```js
const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()

app.use(history())
app.use(express.static(path.join(__dirname, "../vue-demo/dist")))


app.listen(3000, () => {
  console.log("服务器已开启")
})
```

nginx:
```nginx
location / {
  root html;
  index index.html index.htm;
  try_files $uri $uri/ /index.html; # 找当前文件，如果找不到，就找index.html
}
```

## hash模式

- URL中#后面的内容作为路由地址
- 监听hashchange事件加载不同的组件


## install

因为router是通过插件安装的，所以要实现一个类，里面暴露一个install方法

```js
let _Vue = null

export default class MyVueRouter {
  static install(Vue) {
    // 1. 判断插件是否安装过

    if(MyVueRouter.install.installed) {
      return
    }
    MyVueRouter.install.installed = ture
    // 2. 将Vue实例保存起来

    _Vue = Vue
    // 3. 把创建Vue实例的时候传入的router对象注入Vue实力上
    // 使用混入
    _Vue.mixin({
      beforeCreate() {
        if(this.$options.router) {
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }
}

```

## 完整版

```js
let _Vue = null

export default class MyVueRouter {
  static install(Vue) {
    // 1. 判断插件是否安装过
    if (MyVueRouter.install.installed) {
      return
    }
    MyVueRouter.install.installed = true
    // 2. 将Vue实例保存起来
    _Vue = Vue
    // 3. 把创建Vue实例的时候传入的router对象注入Vue实力上
    // 使用混润
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routerMap = {}
    this.data = _Vue.observable({
      current: '/', // 当前路由地址
    })
  }

  init() {
    this.createRouteMap()
    this.initComponent(_Vue)
    this.initEvent()
  }

  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponent(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        return h('a', {
          attrs: { href: this.to }, on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, "", this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })

    const self = this
    Vue.component('router-view', {
      render(h) {
        // 找到当前路由，通过map找到对应的component，然后再通过虚拟dom返回出去
        const component = self.routerMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}

```
