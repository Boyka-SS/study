/**
 * 
 * 操作数据库的步骤：
 * ①安装操作MySQL数据库的第三E方模块(mysq|)
 * ②通过mysql模块连接到MySQL数据库
 * ③通过mysql模块执行SQL语句
 * 
 */

const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'test'
})

db.query('SELECT prod_name,prod_price FROM `products`', (err, results, fields) => {
    if (err) throw err;
    console.log('The solution is: ', results);
})
