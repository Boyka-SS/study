//1 导入 express
const express = require('express')

//2 创建Web服务器
const app = express()

//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})

//4 获取URL中动态参数
//通过req.params对象，可以访问到URL中，通过 : 匹配到的动态参数
app.get('/user/:id/:name', (req, res) => { 
    //req.params默认空对象
    //里面存放着 : 动态匹配到的参数值
    console.log(req.params); 
    res.send(req.params)
})


