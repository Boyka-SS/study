//1 导入 express
const express = require('express')

//2 创建Web服务器
const app = express()

//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})

//4 监听GET请求
//  params1：客户端请求的URL地址
//  params2：请求对应的处理函数
//           req：请求对象（包含了与请求相关的属性与方法）
//           res：响应对象（包含了与响应相关的属性与方法）
app.get('/user', (req, res) => {
    //res.send() 把处理好的内容发送到客户端
    //向客户端响应一个JSON对象
    res.send({ name: 'flh', age: 20, gender: '男' })
})

//5 监听POST请求
//  params1：客户端请求的URL地址
//  params2：请求对应的处理函数
//           req：请求对象（包含了与请求相关的属性与方法）
//           res：响应对象（包含了与响应相关的属性与方法）
app.post('/user', (req, res) => {
    //向客户端响应 文本字符串
    res.send('请求成功')
})