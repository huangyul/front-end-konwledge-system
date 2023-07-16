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
