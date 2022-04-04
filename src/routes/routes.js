const express = require('express');
const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Student = require("../models/models");
const verify = require("./verifyToken");
const dotenv = require('dotenv').config()

const router = express.Router();

router.get("/student",async(req,res)=>{
    return res.json("Welcome to  Student profile");
})


router.post("/addingStudent",async(req,res)=>{
    try{
        const password =req.body.password
        const cpassword = req.body.confirmPassword 

                if(password==cpassword){
                const student = new Student({
                    firstName       : req.body.firstName,
                    lastName        : req.body.lastName,
                    email           : req.body.email,
                    phoneNumber     : req.body.phoneNumber,
                    permanentAddress: req.body.permanentAddress,
                    zipcode         : req.body.zipcode,
                    password        : password,
                    confirmPassword : cpassword
                })
        const a1 = await student.save();
        return res.json(a1);

    }else{
        res.json("password and confirm password are not matching");
    }
    }catch (err){
        console.log("error at adding Student Data"+err);
    }
})
router.get("/allStudent",async(req,res)=>{
    try {
        const allstudent = await Student.find();
        return res.json(allstudent);
    }catch{
        res.json("error at getting all Student Deatails");
    }
})
router.get("/oneStudent/:id",async(req,res)=>{
    try{
        const _id = req.params.id
        const oneStudent = await Student.findById(_id);
        return res.json(oneStudent);

    }catch(err){
        console.log("error at getonestudent" +err);
    }

})
router.patch('/updateOneStudent/:id',async(req,res)=>{
    try{
        const _id = req.params.id
        const updateData = {
            firstName       : req.body.firstName,
            lastName        : req.body.lastName,
            email           : req.body.email,
            phoneNumber     : req.body.phoneNumber,
            permanentAddress: req.body.permanentAddress,
            zipcode         : req.body.zipcode,
            password        : req.body.password,
            confirmPassword : req.body.confirmPassword
        }
        const update = await Student.findByIdAndUpdate(_id,{$set:updateData});
        return res.json({
            message : "update the data succesfully",update
        })
    }catch(err){
        console.log("error at UpdateOneStudent" +err);
    }
})
router.delete("/deleteOneStudent/:id",async(req,res)=>{
    try{
        const _id = req.params.id
        const student = await Student.findByIdAndDelete(_id);
        return res.json({
            message : 'student Delete data succesfully',student
        })

    }catch(err){
        console.log("error at delete Student"+err);
    }
})
router.post("/NewStudent",async(req,res)=>{
    const emailExist = await Student.findOne({email : req.body.email});
    if(emailExist) return res.status(400).json('Email is alredy exist');

    const hashedPassword = await bcrypt.hash(req.body.password,10);
    //const hashedPassword1 = await bcrypt.hash(req.body.confirmPassword,10);
    try {
        const password = hashedPassword
        const cpassword = hashedPassword

                if(password==cpassword){
                const Student = new Student({
                    firstName       : req.body.firstName,
                    lastName        : req.body.lastName,
                    email           : req.body.email,
                    phoneNumber     : req.body.phoneNumber,
                    permanentAddress: req.body.permanentAddress,
                    zipcode         : req.body.zipcode,
                    password        : password,
                    confirmPassword : cpassword
                })
        const a1 = await Student.save();
        return res.json(a1);

    }else{
        res.json("password and confirm password are not matching");
    }
    }catch(err){
        res.json('error at adding hashpassword');
    }
})
router.post("/studentlogin",async(req,res)=>{

    const email = req.body.email
    const password =req.body.password
    //if email checking in db
    const userEmail= await Student.findOne({email :email});
    if(!userEmail) return res.status(400).json('Email not found');

    // checking password is correct are not
    const validpass = await bcrypt.compare(password,userEmail.password);
    if(!validpass) return res.status(400).json('envalid password');

    try{
        const token = jwt.sign({Student:userEmail},process.env.TOKEN_SECRET);
        res.header('auth-token',token).json(token);

        return res.send('logged in');

    }catch(err){
        console.log('Error at studentloginPage' + err);
    }
})
router.get("/",verify,async(req,res,next)=>{
    return await res.json(req.Student);
})

module.exports = router;