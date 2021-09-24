const express = require('express')
const router = express.Router()

// 获取users表格
const usersModel = require('../models/usersModel')

router.get('/users', (req, res) => {
  usersModel.save({ name: 'name' })
  res.send('cg')
})

module.exports = router
