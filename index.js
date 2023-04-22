const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const router = require('./routes')
const app = express();
const cookieParser = requrie('cookie-parser')

app.use(express.json())
app.use(cookieParser())


//Using Application Level Middleware
app.use('/api', router)

mongoose.connect(process.env.MONGO_URI, {user: process.env.MONGO_URI, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection;

try{
    app.listen(process.env.PORT,()=>{
        console.log("connected to db and Listening to port 5000");
        // });

    });
}
catch (error) {console.log("Error in connecting")};