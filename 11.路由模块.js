/**
 * 注册路由模块 
 */



const express = require('express')
const app = express()

// 1、导入路由模块
const useRouter = require('./router')
// 2、使用app.use()注册路由模块
app.use(useRouter)

// 3、为路由模块添加前缀,添加统一的访问前缀 /api
// app.use('/api', useRouter)



//app.use()用来注册全局中间件

app.listen(80, () => {
    console.log('express server running at  http://127.0.0.1:80');
})

