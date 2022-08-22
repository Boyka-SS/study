/**
 * 创建基本的Web服务器
 */
//1 导入 express
const express = require('express')
const router = require('./17.apiRouter')

//2 创建Web服务器
const app = express()


//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)


//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})