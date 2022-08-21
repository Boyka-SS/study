//1 导入 express
const express = require('express')

//2 创建Web服务器
const app = express()

/**
 * express.static() 创建一个静态资源服务器
 * 如：如下代码将public目录下的图片、css文件，JS文件对外开放访问
 * 
 * app.use(express.static('public'))
 * 
 * 这样以后就可以访问public目录中的所有文件了:
 * http://localhost:3000/images/bg.jpg
 * http://localhost:3000/css/style.jpg
 * http://localhost:3000/js/login.js
 * 
 * 注意：
 *  Express在指定的静态目录中查找文件，并对外提供资源的访问路径。
 *  因此，存放静态文件的目录名不会出现在URL中
 */
 
app.use(express.static('./clock'))

//3 调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})