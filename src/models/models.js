const mongoose = require("mongoose");
const validator = require('validator');

const studentSchema = mongoose.Schema({

    firstName :{
        type : String,
        required : true
    } ,
    lastName: {
        type : String,
        required: true
    },
    
    email:{
        type:String,
        unique : true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
        }
    },
    phoneNumber: {
        type : Number,
        required : true,
    
    },
    permanentAddress :{
        type:String,
        required : true
    },
    zipcode :{
        type: String,
        required : true,
    },
    password: {
        type : String||Number,
        unique : true,
        required : true
    },confirmPassword :{
        type : String||Number,
        unique:true,
        required: true
    }

})
const Student = new mongoose.model("studentRegistration",studentSchema);

module.exports = Student;