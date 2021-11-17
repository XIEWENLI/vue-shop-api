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

module.exports = router
