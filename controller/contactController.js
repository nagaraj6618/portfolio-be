const ContactSchema = require('../model/contact.js');

const getOneContactInfo = async(req,res) => {
   try{
   const contactData = await ContactSchema.findById(req.params.id)
   console.log(contactData);
   if(!contactData){
      res.status(404).json({data:[],message:"unsuccess"})
   }
   res.json({data:contactData , message:"success"});
   }
   catch (err){
      res.status(500).json({message:"unsuccess.."})
   }
}
const getAllContactInfo = async(req,res) => {
   const contactData = await ContactSchema.find({})
   console.log(contactData)
   try{
      res.status(200).json({contactData,message:"success"});
   }
   catch(error){
      res.status(500).json({message:'unsuccess'});
   }
}

const postContactInfo = async(req,res) => {

   try{
      const newPost = new ContactSchema(req.body)
      await newPost.save()
      // console.log(req.body);
      res.status(201).json({message:'Success',data:req.body});
   }
   catch(error){
      res.status(500).json({message:'Unsuccess'});
   }
   
}
module.exports = {getAllContactInfo , postContactInfo ,getOneContactInfo};