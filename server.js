const express = require("express");
const app = express();
const mongoose  = require("mongoose");
require('dotenv').config();

// connection to database 
const port = process.env.Port || 3000;
const DB = process.env.DB_URL

// You can connect to MongoDB with the mongoose.connect() method.

mongoose.connect(DB, {
  useNewUrlParser : true,
  useCreateIndex : true,
  useUnifiedTopology : true,
  useFindAndModify : false
}).then(() => {
    console.log("Connected Successfully")
}).catch ((err) =>  console.log("Error :", err))

// The app.use() function is used to mount the specified middleware function(s) at the path 
// which is being specified. It is mostly used to set up middleware for your application.

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "Content-Range")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// api routes file 
let Api = require('./src/routes');
app.use('/api/', Api)

// if route not found it will gives predefine error to user 
app.use("/", (req, res)=>{
    res.status(404).send({ success: false, message: "Route Not found", data: null })
})

// it will show server is connected or not on terminal
app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});