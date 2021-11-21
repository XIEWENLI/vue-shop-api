const express = require('express')
const router = express.Router()

// 导入ObjectId()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// Users表格连接
const usersModel = require('../models/usersModel')

// 注册用户
router.post('/addUser', (req, res) => {
  const userData = req.body
  usersModel
    .where({ username: userData.username })
    .findOne()
    .then(dt => {
      if (dt === null) {
        usersModel.save({
          username: userData.username,
          password: userData.password,
          prohibit: 'false'
        })
        f2()
        // 解决数据库不能及时更新而出现的报错
        function f2() {
          usersModel
            .where({ username: userData.username })
            .findOne()
            .then(dt2 => {
              if (dt2 === null) {
                f2()
                return
              }
              res.send({
                data: dt2.username,
                userId: dt2._id
              })
            })
        }
      } else {
        res.send({
          data: '用户名已存在！！！'
        })
      }
    })
})

// 用户名查询登录
router.get('/getUser', (req, res) => {
  const userData = req.query
  usersModel
    .where({ username: userData.username })
    .findOne()
    .then(dt => {
      if (dt === null) {
        res.send({
          data: '用户不存在！！！'
        })
      } else if (userData.password === dt.password) {
        if (dt.prohibit === 'true') {
          res.send({
            isLogin: dt.prohibit
          })
        } else {
          res.send({
            data: dt.username,
            userId: dt._id
          })
        }
      } else {
        res.send({
          data: '密码错误！'
        })
      }
    })
})

// 用户id查询
router.get('/getUserOne', (req, res) => {
  const userData = req.query
  usersModel
    .where({ _id: ObjectId(userData.userId) })
    .findOne()
    .then(dt => {
      res.send({
        data: dt
      })
    })
})

// 查询所有用户
router.get('/getUsers', (req, res) => {
  // 获取url参数
  const Params = req.query
  // 使用 skip 跳过前 Skip 项
  let Skip = Number(Params.count)
  // usersModel.where().count()是promise
  f()
  async function f() {
    // 数据库中商品的总数
    const count = await usersModel.where().count()
    usersModel
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

// 按id删除单个用户
router.get('/deleteUser', (req, res) => {
  const urlData = req.query
  usersModel
    .where({ _id: ObjectId(urlData.userId) })
    .find()
    .then(dt => {
      usersModel.delete(dt)
      res.send({
        data: dt
      })
    })
})

// 按用户usersName查询单个用户信息
router.get('/getusersName', (req, res) => {
  const usersName = req.query
  usersModel
    .where({ username: new RegExp(usersName.usersName) })
    .find()
    .then(dt => {
      if (dt <= 0) {
        res.send({ isEmpty: true })
      } else {
        res.send(dt)
      }
    })
})

//根据用户名修改用户密码信息（用户名不能修改）
router.get('/updateUser', (req, res) => {
  const userData = req.query
  usersModel
    .where({ username: userData.username })
    .findOne()
    .then(dt => {
      if (dt === null) {
        res.send({
          data: '用户不存在！！！'
        })
      } else if (userData.username === dt.username) {
        dt.password = userData.password
        usersModel.save(dt)
        res.send({
          data: '密码修改成功！！!'
        })
      } else {
        res.send({
          data: '用户名错误！！！'
        })
      }
    })
})

//根据用户名修改账户是否可以正常登录信息（用户名不能修改）
router.get('/updateUserLogin', (req, res) => {
  const userData = req.query
  usersModel
    .where({ _id: ObjectId(userData.userId) })
    .findOne()
    .then(dt => {
      dt.prohibit = userData.prohibit
      usersModel.save(dt)
      res.send({
        data: '操作成功！'
      })
    })
})

// 按用户userName查询单个商品信息
router.get('/getUserName', (req, res) => {
  const userName = req.query
  usersModel
    .where({ username: new RegExp(userName.userName) })
    .find()
    .then(dt => {
      if (dt <= 0) {
        res.send({ isEmpty: true })
      } else {
        res.send(dt)
      }
    })
})

module.exports = router
