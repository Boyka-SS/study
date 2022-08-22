
/*
    自己手动模拟一个类似于express.urlencoded 这样的中间件,来解析POST提交到服务器的表单数据。
    实现步骤:
        ①定义中间件
        ②监听req的data事件
        ③监听req的end事件
        ④使用querystring模块解析请求体数据
        ⑤将解析出来的数据对象挂载为req.body
        ⑥将自定义中间件封装为模块

 */

const express = require('express')
const app = express()

const bodyParse = require('./15.custom-body-parse')



//这是解析表单数据的中间件
app.use(bodyParse)

app.post('/user', (req, res) => {
    res.send(req.body)
})

app.listen(80, () => {
    console.log('http://127.0.0.1:80');
})
