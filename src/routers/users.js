const express = require('express')
const router = express.Router()

// Users表格连接
const usersModel = require('../models/usersModel')

// 注册用户
router.post('/setUser', (req, res) => {
  const userData = req.body
  usersModel
    .where({ username: userData.username })
    .findOne()
    .then(dt => {
      if (dt === null) {
        usersModel.save({
          username: userData.username,
          password: userData.password
        })
        res.send({
          data: userData.username
        })
      } else {
        res.send({
          data: '用户名已存在！！！'
        })
      }
    })
})

// 用户登录
router.post('/getUser', (req, res) => {
  const userData = req.body
  usersModel
    .where({ username: userData.username })
    .findOne()
    .then(dt => {
      if (dt === null) {
        res.send({
          data: '用户不存在！！！'
        })
      } else if (userData.password === dt.password) {
        res.send({
          data: dt.username,
          userId: dt._id
        })
      } else {
        res.send({
          data: '密码错误！！！'
        })
      }
    })
})

module.exports = router
