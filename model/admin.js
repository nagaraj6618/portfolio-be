const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
   username:{
      type:String,
      required:true,
      unique:true
   },
  
   email:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true,
   },
   role:{
      type:String,
      default:'admin'
   },
})

module.exports = mongoose.model('admin',adminSchema);
