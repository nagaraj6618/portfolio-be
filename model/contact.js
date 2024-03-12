const mongoose = require('mongoose');
let date =new Date(Date.now());
date = date.toLocaleString()
date = date.toString().substring(0,9)

const ContactSchema = new mongoose.Schema({
  name:{
   type:String,
   required:true,
  },
  email:{
   type:String,
   required:true,

  },
  message:{
   type:String,
   required:true
  } ,
  time:{
    type:String,
    required:true,
    default:date
  }
})

module.exports =  mongoose.model('contact',ContactSchema); 