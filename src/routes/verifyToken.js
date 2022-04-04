const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config()



const Token = ((req,res,next) =>{
        const token = req.header('auth-token');
        if(!token) return res.status(401).send('access declinied');
    
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.Student = verified;
        next();
    }
    catch(err){
        res.status(400).send('invalid Token');

    }
})
module.exports = Token;

