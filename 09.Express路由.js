/**
 * Express中的路由：
 * 在Express中，路由指的是客户端的请求与服务器处理函数之间的映射关系
 * 
 * Express中的路由分3部分组成，分别是 请求类型，请求的URL，处理函数，格式如下：
 *  
 *  app.METHOD(PATH,HANDLER)
 * 
 * 路由匹配的过程：
 *  每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数
 *  在匹配时候，会按照路由的顺序进行匹配，如果请求类型和请求的URL同时匹配成功，则Express会将这次请求，转交给对应的function函数处理。
 * 
 * 注意点：
 * ①按照定义的先后顺序进行匹配 
 * ②请求类型和请求的URL同时匹配成功，才会调用对应的的处理函数
 * 
 */

//路由的使用：直接挂载到app上面，缺点：后期难以维护
const express = require('express')

const app = express()

app.get('/user', (req, res) => {res.send({ name: 'flh', age: 20, gender: '男' })})
app.post('/user', (req, res) => {res.send('请求成功')})

app.listen(80, () => {console.log('express server running at  http://127.0.0.1:80');})