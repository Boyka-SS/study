//1 导入 express
const express = require('express')

//2 创建Web服务器
const app = express()

//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})

//4 获取URL中携带的查询参数
//通过req.query对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数

app.get('/', (req, res) => { 
    //req.query默认空对象
    //客户端使用 ?name=flh&age=20 这种查询字符串形式，发送到服务器的参数，
    //可以通过 req.query 对象访问到，如：
    //req.query.name req.query.age
    console.log(req.query); 
    res.send('ok')
})


