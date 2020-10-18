const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const studentRouter = require('./routes/student');
const parentRouter = require('./routes/parent');
const teacherRouter = require('./routes/teacher');

//app
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-auth,x-xsrf-token')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Expose-Headers', 'x-auth')
    next()
  })

//db connnection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex:true
})
.then(() => {console.log('db connected ')})

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//route
app.use('/api/students/',studentRouter);
app.use('/api/parents/',parentRouter);
app.use('/api/teachers/',teacherRouter);

const PORT = process.env.PORT || 5000

app.get('/status', (req, res)=>{
    res.send("I am listenning");
})
app.listen(PORT, ()=> console.log("App is listenning on port "+ PORT))
