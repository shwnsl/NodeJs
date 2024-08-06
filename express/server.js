const express = require('express');
const app = express();
const port = 3333;
const path = require('path'), async = require('async'), fs = require('fs')

const users = [
    {name: 'kim', email: 'kim@naber.com'},
    {name: 'lee', email: 'lee@naber.com'},
    {name: 'park', email: 'park@naber.com'}
]

// app.listen(port, () => {
//     console.log('server on!@#$@#$')
// })

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

// app.get('/post', (req, res) => [
//     res.send('포스트 페이지입니다')
// ])

// app.get('/shop', (req, res) => [
//     res.send('쇼핑 페이지입니다')
// ])

app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(port, () => {
    console.log(`서버 실행! http://localhost:${port}`)
})

// app.get('/greet', (req, res) => {
//     res.send(JSON.stringify({message: "안영시발아?"}))
// })