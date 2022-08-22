const express = require('express')

const router = express.Router()

router.get('/user/list', (req, res) => {
    const query = req.query

    res.send({
        status: 200,
        msg: '请求成功',
        data: query
    })
})

router.post('/user/add', (req, res) => {
    const body = req.body
    res.send({
        status: 200,
        msg: '请求成功',
        data: body
    })
})

module.exports = router