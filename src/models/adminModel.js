// 引入 @byteinspire/api 库，该库提供了轻服务的各种开箱即用功能
const inspirecloud = require('@byteinspire/api')

// 使用 inspirecloud.db.table 获取数据表，若该表不存在会默认创建
const adminModel = inspirecloud.db.table('admin')

// 导出该表，以便在 Service 中使用
module.exports = adminModel
