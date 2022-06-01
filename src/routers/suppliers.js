const express = require('express')
const router = express.Router()

// 导入ObjectId()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// shopping_car表格连接
const suppliersModel = require('../models/suppliers')

// 获取全部供应商
router.get('/getSuppliers',(req,res) => {
  suppliersModel
    .where()
    .find()
    .then(dt => {
      res.send(dt)
    })
})

// 根据supplierName搜索
router.get('/getSupplierName', (req, res) => {
  const supplierData = req.query
  suppliersModel
    .where({ supplierName: new RegExp(supplierData.supplierName) })
    .find()
    .then(dt => {
      res.send(dt)
    })
})

// 添加单个供应商信息
router.post('/addSupplierOne', (req, res) => {
  const supplierData = req.body
  suppliersModel.save(supplierData)
  res.send(supplierData)
})

// 按id删除单个商品
router.get('/deleteSupplier', (req, res) => {
  const urlParams = req.query
  if (urlParams.id !== undefined) {
    suppliersModel
      .where({ _id: ObjectId(urlParams.id) })
      .find()
      .then(dt => {
        suppliersModel.delete(dt)
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

// 按_id修改供应商信息
router.post('/updateSupplier', (req, res) => {
  const supplierData = req.body
  suppliersModel
    .where({ _id: ObjectId(supplierData.id) })
    .findOne()
    .then(dt => {
      dt.supplierName = supplierData.supplierName
      suppliersModel.save(dt)
      res.send(dt)
    })
})



module.exports = router