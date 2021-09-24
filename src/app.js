const express = require('express')
const app = express()

const path = require('path')
// 引入 @byteinspire/api 库，该库提供了轻服务的各种开箱即用功能
const inspirecloud = require('@byteinspire/api')

// 开放静态文件
app.use(express.static(path.join(__dirname, '../public')))
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(express.json())

// 路由
const admin = require('./routers/admin')
const users = require('./routers/users')
const goods = require('./routers/goods')
const shopping_car = require('./routers/shopping_car')
const order = require('./routers/order')

app.use(admin)
app.use(users)
app.use(goods)
app.use(shopping_car)
app.use(order)

// 导出 Express 对象
module.exports = app
