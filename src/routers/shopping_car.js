const express = require('express')
const router = express.Router()

// 导入ObjectId()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// shopping_car表格连接
const shoppingCarModel = require('../models/shoppingCarModel')

// goods表格连接
const goodsModel = require('../models/goodsModel')

// 购物车全部商品 获取
router.get('/getShoppingCar', (req, res) => {
  const userData = req.query
  shoppingCarModel
    .where({ userID: ObjectId(userData.userId) })
    .find()
    .then(dt => {
      if (dt.length !== 0) {
        res.send({
          goodsData: dt,
          isEmpty: false
        })
      } else {
        res.send({
          goodsData: '',
          isEmpty: true
        })
      }
    })
})

// 购物车商品 添加
router.get('/addShoppingCar', (req, res) => {
  var shoppingCarData = req.query
  shoppingCarModel
    .where({
      userID: ObjectId(shoppingCarData.userId),
      goodsID: ObjectId(shoppingCarData.goodsId)
    })
    .findOne()
    .then(dt => {
      if (dt === null) {
        shoppingCarModel.save({
          userID: ObjectId(shoppingCarData.userId),
          goodsID: ObjectId(shoppingCarData.goodsId),
          buySum: Number(shoppingCarData.buySum)
        })
        res.send({
          news: '添加成功！！！',
          static: true
        })
      } else {
        dt.buySum += Number(shoppingCarData.buySum)
        // 加入购物车商品时，数量不超过库存
        if (dt.buySum > shoppingCarData.goodsSum) {
          dt.buySum = shoppingCarData.goodsSum
        }
        shoppingCarModel.save(dt)
        res.send({
          news: '修改成功！！！',
          // true则购物车 提示 添加或修改成功，否则 提示 失败
          static: true
        })
      }
    })
})

// 获取最新的 buySum值
router.get('/getShoppingCarOne', (req, res) => {
  var shoppingCarData = req.query
  shoppingCarModel
    .where({
      userID: ObjectId(shoppingCarData.userId),
      goodsID: ObjectId(shoppingCarData.goodsId)
    })
    .findOne()
    .then(dt => {
      res.send(dt)
    })
})

// 购物车商品修改 数量
router.get('/updataShoopingCar', (req, res) => {
  const data = req.query
  shoppingCarModel
    .where({
      userID: ObjectId(data.userId),
      goodsID: ObjectId(data.goodsId)
    })
    .findOne()
    .then(dt => {
      dt.buySum = parseInt(data.buySum)
      shoppingCarModel.save(dt)
      res.send({
        news: '修改成功！！！'
      })
    })
})

// shoppingCar表里的指定_id 删除
router.get('/deleteShoopingCar', (req, res) => {
  const data = req.query
  console.log(data)
  shoppingCarModel
    .where({
      _id: ObjectId(data.shoppingCarId)
    })
    .findOne()
    .then(dt => {
      shoppingCarModel.delete(dt)
      res.send({
        deleteState: true
      })
    })
})

module.exports = router
