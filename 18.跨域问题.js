/**
 * 17文件里编写的get和post请求皆不支持跨域，解决跨域主要有两种方法：
 * ① CORS（主流）
 * ② JSONP（仅支持GET请求）
 * 
 * 使用CORS中间件解决跨域问题
 * cors是Express的一个第三方中间件。通过安装和配置cors中间件，可以方便地解决跨域问题
 * 一定要在路由之前，配置cors这个中间件，从而解决接口跨域的问题
 * 使用步骤：
 * ①安装中间件
 * ②导入中间件
 * ③配置中间件
 */

/**
 * 创建基本的Web服务器
 */
//1 导入 express
const express = require('express')
const router = require('./17.apiRouter')
const cors = reuqire('cors')

//2 创建Web服务器
const app = express()


//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api', router)


//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})