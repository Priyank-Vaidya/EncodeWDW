const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()
const router = require('./routes/routes');
const app = express();
const cookieParser = require('cookie-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json())
app.use(cookieParser())


// Using Application Level Middleware
app.use('/api', router)


// const client = new MongoClient(process.env.MONGO_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("wdw1").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//       app.listen(process.env.PORT,()=>{
//             console.log("connected to db and Listening to port 5000");
//                 });
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);

mongoose.connect(process.env.MONGO_URI, {user: process.env.MONGO_URI, useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection;

try{
    app.listen(process.env.PORT,()=>{
        console.log("connected to db and Listening to port 5000");
        // });

    });
}
catch (error) {console.log("Error in connecting")};