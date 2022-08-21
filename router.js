/**
 * 为了方便管理路由，Express不建议将路由直接挂载到app上，而是推荐将路由抽离为单独的模块
 * 
 * 抽离步骤：
 * ①创建路由模块对应的.js文件
 * ②调用 express.Router()函数创建路由对象
 * ③向路由对象上挂载具体的路由
 * ④使用module.exports向外共享路由对象
 * ⑤使用app.use()函数注册路由模块
 */


//1 导入Express
const express = require('express')

//2 创建路由对象
const router = express.Router()

//3 挂载获取用户列表的路由
router.get('/user/list', (req, res) => {
    res.send('Get user List')
})

//4 挂载添加用户的路由
router.post('/user/add', (req, res) => {
    res.send('Add user')
})
//5 向外导出路由对象
module.exports = router