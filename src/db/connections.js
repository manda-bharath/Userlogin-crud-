const mongoose = require('mongoose');
const dotenv =require('dotenv').config()

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true})

.then(()=>{
    console.log("mongodb is connected.....");
}).catch((err)=>{
    console.log("error at mongodb server" + err);
})