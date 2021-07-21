const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 3000;

app.use(express.json());
app.use(bodyParser.json());

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

let Api = require('./src/routes');

app.use('/api/', Api)

app.use("/", (req, res)=>{
    res.status(404).send({ success: false, message: "Route Not found", data: null })
})

app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});