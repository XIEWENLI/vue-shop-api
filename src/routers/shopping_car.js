const express = require('express')
const router = express.Router()

// 导入ObjectId()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// shopping_car表格连接
const shoppingModel = require('../models/shoppingModel')

// 商品添加
router.post('/addShopping', (req, res) => {
  var shoppingData = req.body
  console.log(shoppingData)
  shoppingModel
    .where({
      userID: ObjectId(shoppingData.userId),
      goodsID: ObjectId(shoppingData.goodsId)
    })
    .findOne()
    .then(dt => {
      if (dt === null) {
        shoppingModel.save({
          userID: ObjectId(shoppingData.userId),
          goodsID: ObjectId(shoppingData.goodsId),
          buySum: shoppingData.buySum
        })
        res.send({
          news: '购物车商品-添加-成功！！！',
          static: true
        })
      } else {
        console.log('---222' + dt)
        dt.buySum += shoppingData.buySum
        shoppingModel.save(dt)
        res.send({
          news: '购物车商品-修改-成功！！！',
          static: true
        })
      }
      // 上面情况不存在是返回
      res.send(
        res.send({
          news: '失败！！！',
          static: false
        })
      )
    })
})

module.exports = router
