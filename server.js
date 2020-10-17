const express = require('express');
// const connectDB = require('./config/db');
// const userRoute = require('./routes/api/users');
// const postsRoute = require('./routes/api/posts');
const authRoute = require('./routes/api/auth');
// const profileRoute = require('./routes/api/profile');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(express.json({extended : false}));
// connectDB();
// app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
// app.use('/api/posts', postsRoute);
// app.use('/api/profiles', profileRoute);

// if(process.env.NODE_ENV == 'production'){
//     app.use(express.static('./client/build'))
//     app.get('*', (req, res)=>{
//         res.sendFile(path.resolve(__dirname , "client", "build", "index.html"))
//     })
// }

const PORT = process.env.PORT || 5000
app.get('/', (req, res)=>{
    res.send("I am listenning");
})
app.listen(PORT, ()=> console.log("App is listenning on port 5000"))
