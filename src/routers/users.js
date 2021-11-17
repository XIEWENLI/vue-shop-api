const express = require('express')
const router = express.Router()

// Users表格连接
const usersModel = require('../models/usersModel')

// 注册用户
router.post('/addUser', (req, res) => {
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
        usersModel
          .where({ username: userData.username })
          .findOne()
          .then(dt2 => {
            res.send({
              data: dt2.username,
              userId: dt2._id
            })
          })
      } else {
        res.send({
          data: '用户名已存在！！！'
        })
      }
    })
})

// 用户登录
router.get('/getUser', (req, res) => {
  const userData = req.query
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

//修改用户信息（用户名不能修改）
router.get('/updateUser', (req, res) => {
  const userData = req.query
  usersModel
    .where({ username: userData.username })
    .findOne()
    .then(dt => {
      if (dt === null) {
        res.send({
          data: '用户不存在！！！'
        })
      } else if (userData.username === dt.username) {
        dt.password = userData.password
        usersModel.save(dt)
        res.send({
          data: '密码修改成功！！!'
        })
      } else {
        res.send({
          data: '用户名错误！！！'
        })
      }
    })
})

module.exports = router
