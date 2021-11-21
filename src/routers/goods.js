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
      .skip(Skip) // 使用 skip 跳过前 10 项
      .limit(12) // 使用 limit 指定返回 12 项
      .find()
      .then(dt => {
        res.send({
          goodsCount: count,
          data: dt
        })
      })
  }
})

// 按商品id查询单个商品信息
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

// 按商品goodsName查询单个商品信息
router.get('/getGoodsName', (req, res) => {
  const goodsName = req.query
  goodsModel
    .where({ goodsName: new RegExp(goodsName.goodsName) })
    .find()
    .then(dt => {
      if (dt <= 0) {
        res.send({ isEmpty: true })
      } else {
        res.send(dt)
      }
    })
})

// 按id删除单个商品
router.get('/deleteGoods', (req, res) => {
  const urlParams = req.query
  if (urlParams.goodsId !== undefined) {
    goodsModel
      .where({ _id: ObjectId(urlParams.goodsId) })
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

// 增加单个商品---
router.post('/addGoodsOne', (req, res) => {
  const goodsData = req.body
  goodsModel.save(goodsData)
  res.send(goodsData)
})

// 按_id修改商品信息
router.post('/updateGoods', (req, res) => {
  const goodsData = req.body
  goodsModel
    .where({ _id: ObjectId(goodsData.goodsId) })
    .findOne()
    .then(dt => {
      dt.goodsName = goodsData.goodsName
      dt.goodsSum = goodsData.goodsSum
      dt.goodsSRC = goodsData.goodsSRC
      dt.goodsPrice = goodsData.goodsPrice
      dt.goodsOldPrice = goodsData.goodsOldPrice
      dt.goodsDetail = goodsData.goodsDetail
      goodsModel.save(dt)
      res.send(dt)
    })
})

// 按商品_id修改商品库存
router.get('/updateGoodsSum', (req, res) => {
  const data = req.query
  goodsModel
    .where({ _id: ObjectId(data.goodsId) })
    .findOne()
    .then(dt => {
      dt.goodsSum = Number(data.goodsSum)
      goodsModel.save(dt)
      res.send({
        data: dt
      })
    })
})

module.exports = router
