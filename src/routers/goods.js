const express = require('express')
const router = express.Router()

// goods表格连接
const goodsModel = require('../models/goodsModel')

// 查询所有商品
router.get('/getGoods', (req, res) => {
  goodsModel
    .where()
    .find()
    .then(dt => {
      res.send({
        data: dt
      })
    })
})

// 按id查询商品
router.get('/getGoodsOne', (req, res) => {
  const urlParams = req.query
  if (urlParams.id !== undefined) {
    goodsModel
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
router.get('/deleteGoods', (req, res) => {
  const urlParams = req.query
  if (urlParams.id !== undefined) {
    goodsModel
      .where({ _id: urlParams.id })
      .find()
      .then(dt => {
        goodsModel.delete(dt)
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
router.post('/addGoods', (req, res) => {
  const postData = req.body
  goodsModel.save(data)
  res.send(postData)
})

// 按id修改商品
router.post('/updateGoods', (req, res) => {
  const postData = req.body
  if (postData.id !== undefined) {
    goodsModel
      .where({ _id: postData.id })
      .find()
      .then(dt => {
        // dt.属性=postData.属性
        goodsModel.save(dt)
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
