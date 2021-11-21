const express = require('express')
const router = express.Router()

// Users表格连接
const adminModel = require('../models/adminModel')

// 管理员登录
router.get('/getAdmin', (req, res) => {
  const userData = req.query
  adminModel
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

// 获取是否开启登录功能状态
router.get('/getAdminDL', (req, res) => {
  adminModel
    .where()
    .findOne()
    .then(dt => {
      res.send({
        data: dt.DL
      })
    })
})
// 设置是否开启登录功能状态
router.get('/setAdminDL', (req, res) => {
  const userData = req.query
  adminModel
    .where()
    .findOne()
    .then(dt => {
      dt.DL = userData.DL
      adminModel.save(dt)
      res.send({
        data: '操作成功！'
      })
    })
})

// 获取是否开启注册功能状态
router.get('/getAdminZC', (req, res) => {
  adminModel
    .where()
    .findOne()
    .then(dt => {
      res.send({
        data: dt.ZC
      })
    })
})
// 设置是否开启注册功能状态
router.get('/setAdminZC', (req, res) => {
  const userData = req.query
  adminModel
    .where()
    .findOne()
    .then(dt => {
      dt.ZC = userData.ZC
      adminModel.save(dt)
      res.send({
        data: '操作成功！'
      })
    })
})

module.exports = router
