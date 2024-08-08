const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
// const cors = require('cors');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(cors());
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    const data = {message: '안녕 씨발련들아?'}
    res.render('index', {
        tasks : tasks,
        users,
        data,
        people: [
            {name: 'kim'},
            {name: 'lee'},
            {name: 'park'}
        ]
    });
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/form', (req, res) => {
    res.render('form')
})

app.post('/submit', (req, res) => {
    const {name, email} = req.body;
    res.render('result', {name, email}) 
})

let tasks = [];
app.post('/addTask', (req, res) => {
    const newTask = req.body.newTask;
    if(newTask) {
        tasks.push(newTask)
    }
    res.redirect('/')
})
app.post('/deleteTask', (req, res) => {
    const deleteTask = req.body.task;
    tasks = tasks.filter(task => task !== deleteTask);
    res.redirect('/');
})

app.listen(8000, () => {
    console.log('server http://localhost:8000')
})

const users = [
    {name : 'kim', age: 17, role: 'front'},
    {name : 'lee', age: 25, role: 'back'},
    {name : 'park', age: 30, role: 'full'},
    {name : 'choi', age: 16, role: 'front'}
]