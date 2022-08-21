/**
 * Express中间件的调用流程：
 *  当一个请求到达Express服务器之后，可以连续调用多个中间件，从而对这次请求进行预处理
 *  中间的输入是上一个中间件的输出 
 *  最终由路由对客户端进行结果响应
 * 
 * Express中间件的格式
 *  本质上就是function处理函数，Express中间件的格式如下：
 *  app.get('/',(req,res,next)=>{
 *      next();
 *  })
 *  注意：中间件处理函数的形参列表中，必须包含next（）参数，而路由处理函数中只包含req，res
 * 
 * next函数的作用
 *  next函数是实现多个中间件连续调用的关键，表示可以把流转关系转交给下一个中间件或者路由
 * 
 * 全局生效的中间件
 *  客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件
 *  通过调用 app.use(中间件函数) ，即可定义一个全局生效的中间件
 * 
 * 中间件的作用
 *  多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在上游的中间件中，统一为req或res对象添
 *  加自定义的属性或方法，供下游的中间件或路由进行使用。
 * 
 * 定义多个全局中间件
 *  可以使用app.use（）连续定义多个全局中间件。
 *  客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用
 */

const express = require('express')

const app = express()

//定义一个全局生效的中间件 ①
const mw = function (req, res, next) {
    console.log('4444444');
    //注意：在当前中间件业务处理完毕后，必须调用next()函数
    //表示把流转关系转交给下一个中间件或者路由
    next()
}
app.use(mw)

//全局中间件的简化形式 ②
app.use(function (req, res, next) {
    //获取当前时间
    const startTime = Date.now()
    req.startTime = startTime
    next();
})

app.get('/user/list', (req, res) => {
    res.send(`get user list ${req.startTime}`)
})

app.listen(80, () => {
    console.log('http"//127.0.0.1');
})

