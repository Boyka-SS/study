/**
 * 中间件的分类
 * ①应用级别的中间件
 * ②路由级别的中间件
 * ③错误级别的中间件
 * ④Express 内置的中间件
 * ⑤第三方的中间件
 * 
 * 注意:除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
 */
/**
 * 应用级别的中间件
 * 通过app.use()或app.get()或app.post()，绑定到app实例上的中间件，叫做应用级别的中间件
 */

/**
 * 路由级别的中间件
 * 绑定到express.Router()实例上的中间件,叫做路由级别的中间件。
 * 用法和应用级别中间件没有任何区别。
 * 只不过，应用级别中间件是绑定到app实例上,路由级别中间件绑定到router实例上。
 */

/**
 * 错误级别的中间件
 * 作用:专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。
 * 格式:错误级别中间件的function处理函数中，必须有4个形参，形参顺序从前到后,分别是(err, req, res, next)。
 * 注意:错误级别的中间件，必须注册在所有路由之后!
 */

/**
 * Express 内置的中间件
 *  express.static      快速托管静态资源的内置中间件,例如: HTML 文件、图片、CSS样式等(无兼容性)
 *  express.json        解析JSON格式的请求体数据(有兼容性,仅在4.16.0+版本中可用)
 *  express.urlencoded  解析URL-encoded格式的请求体数据(有兼容性,仅在4.16.0+版本中可用) 
 */


const express = require('express')

const app = express()

const router = express.Router()


//Express 内置的中间件
//配置解析application/ json格式数据的内置中间件
app.use(express.json())
//配置解析application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
    // 在服务器，可以使用req.body 这个属性，来接收客户端发送过来的请求体数据(JSON 格式的表单数据，url-encoded 格式的数据)
    //默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
    console.log(req.body);
    res.send('ok')
})


//路由级别的中间件
// router.use((req, res, next) => {
//     console.log('路由级别的中间件');
//     next()
// })
// app.use('/', router)










//错误级别的中间件
app.get('/', (req, res) => {
    throw new Error('服务器内部发生了错误！！')
    res.send('Home page')
})

app.use((err, req, res, next) => {
    console.log(err.message);
    res.send('Error! ' + err.message)
})