//1 导入 express
const express = require('express')

//2 创建Web服务器
const app = express()

/**
 * 托管多个静态资源目录
 * 
 * 如果要托管多个静态资源目录，多次调用express.static（）
 * 访问静态资源文件时，express.static()函数会根据目录的添加顺序查找所需的文件
 */
app.use(express.static('./clock'))
app.use(express.static('./file'))

//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})