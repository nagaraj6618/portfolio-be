const ContactSchema = require('../model/contact.js');
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
       user: 'nagaraj516700@gmail.com', 
       pass: 'bgxm fbbf gofe rlbp' 
   }
});
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
      let mailOptions = {
         from: 'NAGARAJ S <nagaraj516700@gmail.com>', 
         to: req.body.email, 
         subject: "Thanks for contacting! We'll get back to you soon.", 
         text: `Dear ${req.body.name},
      
      I am Nagaraj S. Thank you for reaching out! Your message has been received, and I will get back to you as soon as possible.
      
      Best regards,
      Nagaraj S,
      secretary` 
      };
      transporter.sendMail(mailOptions, async function(error, info){
         if (error) {
             console.error('Error sending email:', error);
         } else {
             console.log('Email sent:', info.response);
             await res.status(201).json({message:'Success',data:req.body,email:info.response});
         }
     });
      // res.status(201).json({message:'Success',data:req.body});
   }
   catch(error){
      res.status(500).json({message:'Unsuccess'});
   }
   
}

const deleteOneInfo = async(req,res) => {
   const id = req.params.id;
   try{
      
      const deletedContact = await ContactSchema.deleteOne({_id:id})
      res.status(200).json({message:"Contact deleted successfully", data: deletedContact});
   }
   catch(error){
      res.status(500).json({message:'unsuccess'});
   }
}
module.exports = {getAllContactInfo , postContactInfo ,getOneContactInfo,deleteOneInfo};