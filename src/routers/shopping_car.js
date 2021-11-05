const express = require('express')
const router = express.Router()

// 导入ObjectId()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// shopping_car表格连接
const shoppingCarModel = require('../models/shoppingCarModel')

// goods表格连接
const goodsModel = require('../models/goodsModel')

// 购物车商品添加
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
        shoppingCarModel.save(dt)
        res.send({
          news: '修改成功！！！',
          // true则购物车 提示 添加或修改成功，否则 提示 失败
          static: true
        })
      }
    })
})

// 购物车获取全部商品
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

// 获取最新的buySum值
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

// 购物车商品数量修改
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

// 购物车表里的_id指定删除
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
