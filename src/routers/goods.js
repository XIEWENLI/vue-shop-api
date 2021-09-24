const express = require('express')
const router = express.Router()

// goods表格连接
const goodsModel = require('../models/goodsModel')

// 查询所有商品
router.get('/goods', (req, res) => {
  goodsModel
    .where()
    .find()
    .then(dt => {
      res.send({
        data: dt
      })
    })
})

// 按条件查询商品
router.get('/goodsOne', (req, res) => {
  const urlParams = req.query
  console.log(urlParams)
  goodsModel
    .where()
    .findOne()
    .then(dt => {
      res.send({
        data: dt
      })
    })
})

module.exports = router
