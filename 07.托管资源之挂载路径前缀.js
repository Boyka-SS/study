//1 导入 express
const express = require('express')

//2 创建Web服务器
const app = express()

/**
 * 如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：
 */
app.use('/public', express.static('clock'))


//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})