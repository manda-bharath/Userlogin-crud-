const express = require('express');
const  dbconnections = require("./src/db/connections");
const router = require("./src/routes/routes");
const bodyParser =require("body-parser");
const dotenv = require("dotenv").config()

const app = express();


const port = process.env.PORT||8080;
app.use(bodyParser.json());
app.use(express.json())
app.use(router);



app.listen(port,()=>{
    console.log(`server is listing at:${port}`);
})