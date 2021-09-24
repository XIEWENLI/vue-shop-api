const path = require('path')

const express = require('express')
const app = express()

// 为应用使用中间件
// 静态文件中间件
app.use(express.static(path.join(__dirname, '../public')))
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(express.json())

// 导出 Express 对象
module.exports = app
