const express = require('express');
const mongoose = require('mongoose');




const kidSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String,required:true},
    gender:{type:String,required:true},
    dob:{type:Date,required:true},
    country:{type:String,required:true},
    description:{type:String,required:true}

})


module.exports = mongoose.model('Kid', kidSchema);