const express = require('express')
const router = express.Router()

// 导入ObjectId()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// shopping_car表格连接
const orderModel = require('../models/orderModel')

// 1、AllOrder.vue获取全部订单
router.get('/getAllOrder', (req, res) => {
  const orderData = req.query
  orderModel
    .where({ userID: ObjectId(orderData.userId) })
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

// AllOrder.vue付款后，修改订单buyState值
router.get('/updataBuyStateOrder', (req, res) => {
  const orderData = req.query
  orderModel
    .where({ _id: ObjectId(orderData.orderId) })
    .findOne()
    .then(dt => {
      dt.payState = orderData.payState
      orderModel.save(dt)
      res.send(dt)
    })
})

// 2、NoPayOrde.vue获取全部订单
router.get('/getNoPayOrder', (req, res) => {
  const orderData = req.query
  orderModel
    .where({ userID: ObjectId(orderData.userId), payState: orderData.payState })
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

// 3、NotDeliverGoodsOrder.vue获取全部订单
router.get('/getNotDeliverGoodsOrder', (req, res) => {
  const orderData = req.query
  orderModel
    .where({
      userID: ObjectId(orderData.userId),
      payState: orderData.payState,
      deliverState: orderData.deliverState
    })
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

// 4、NotReceiveGoodsOrder.vue获取全部订单
router.get('/getNotReceiveGoodsOrder', (req, res) => {
  const orderData = req.query
  orderModel
    .where({
      userID: ObjectId(orderData.userId),
      payState: orderData.payState,
      deliverState: orderData.deliverState,
      receiveState: orderData.receiveState
    })
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

// order表的商品添加
router.get('/addOrder', (req, res) => {
  var orderData = req.query
  orderModel.save({
    userID: ObjectId(orderData.userId),
    goodsID: ObjectId(orderData.goodsId),
    buySum: Number(orderData.buySum),
    // 用户付款则为true
    payState: orderData.payState,
    // deliverState 管理员发货则为true
    deliverState: orderData.deliverState,
    // 用户收货则为true
    receiveState: orderData.receiveState
  })
  res.send({
    state: true
  })
})

// order表里的_id指定删除
router.get('/deleteOrder', (req, res) => {
  const data = req.query
  orderModel
    .where({
      _id: ObjectId(data.orderId)
    })
    .findOne()
    .then(dt => {
      orderModel.delete(dt)
      res.send({
        deleteState: true
      })
    })
})

module.exports = router
