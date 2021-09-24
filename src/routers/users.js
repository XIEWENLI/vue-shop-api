const express = require('express')
const router = express.Router()

// Users表格连接
const usersModel = require('../models/usersModel')

// 查询所有商品
router.get('/getUsers', (req, res) => {
  usersModel
    .where()
    .find()
    .then(dt => {
      res.send({
        data: dt
      })
    })
})

// 按id查询商品
router.get('/getUsersOne', (req, res) => {
  const urlParams = req.query
  if (urlParams.id !== undefined) {
    usersModel
      .where({ _id: urlParams.id })
      .find()
      .then(dt => {
        res.send({
          data: dt
        })
      })
  } else {
    res.send({
      data: null
    })
  }
})

// 按id删除商品
router.get('/deleteUsers', (req, res) => {
  const urlParams = req.query
  if (urlParams.id !== undefined) {
    usersModel
      .where({ _id: urlParams.id })
      .find()
      .then(dt => {
        usersModel.delete(dt)
        res.send({
          data: dt
        })
      })
  } else {
    res.send({
      data: null
    })
  }
})

// 增加商品
router.post('/addUsers', (req, res) => {
  const postData = req.body
  usersModel.save(data)
  res.send(postData)
})

// 按id修改商品
router.post('/updateUsers', (req, res) => {
  const postData = req.body
  if (postData.id !== undefined) {
    usersModel
      .where({ _id: postData.id })
      .find()
      .then(dt => {
        // dt.属性=postData.属性
        usersModel.save(dt)
        res.send({
          data: dt
        })
      })
  } else {
    res.send({
      data: null
    })
  }
})

module.exports = router
