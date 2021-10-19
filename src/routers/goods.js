const express = require('express')
const router = express.Router()

// 导入ObjectId()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// goods表格连接
const goodsModel = require('../models/goodsModel')

// 查询所有商品
router.get('/getGoods', (req, res) => {
  // 获取url参数
  const Params = req.query
  // 使用 skip 跳过前 Skip 项
  let Skip = Number(Params.count)
  // goodsModel.where().count()是promise
  f()
  async function f() {
    // 数据库中商品的总数
    const count = await goodsModel.where().count()
    goodsModel
      .where()
      .skip(Skip) // 使用 skip 跳过前 2 项
      .limit(12) // 使用 limit 指定返回 2 项
      .find()
      .then(dt => {
        res.send({
          goodsCount: count,
          data: dt
        })
      })
  }
})

// 按id查询单个商品
router.get('/getGoodsOne', (req, res) => {
  const urlId = req.query
  goodsModel
    .where({ _id: ObjectId(urlId._id) }) //导入mongoose解决ObjectId()
    .findOne()
    .then(dt => {
      res.send({
        goods: dt
      })
    })
})

// 按id删除单个商品
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

// 增加单个商品
router.post('/addGoods', (req, res) => {
  const postData = req.body
  goodsModel.save(data)
  res.send(postData)
})

// 按id修改商品
router.get('/updateGoods', (req, res) => {
  const data = req.query
  if (data.id !== undefined) {
    goodsModel
      .where({ _id: data.id })
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
