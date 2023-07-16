# 服务端渲染

- SPA应用首屏加载慢，不利于SEO
- 同构应用：首屏通过服务端渲染，剩下的通过客户端渲染

## 使用node实现服务端渲染

服务端渲染的过程：
1. 客户端发送请求
2. 服务器收到请求后，向数据库获取需要的数据
3. 服务器拿到数据后，再跟模板结合，返回给客户端

```js
const express = require('express')
const fs = require('fs')
const template = require('art-template')

const app = express()

app.get('/', (req, res) => {
  // 模拟获取数据
  const data = fs.readFileSync('./data.json', 'utf-8')

  // 获取模板
  const templateStr = fs.readFileSync('./index.html', 'uft-8')

  // 将模板与数据结合生成html
  const html = template.render(templateStr, data)

  // 返回html模板
  res.send(html)
})
```

## 现代化服务端渲染（同构）

- 首屏渲染在服务端执行
- 页面交互在客户端执行
- 核心解决SEO和首屏渲染慢的问题

### Next体验
