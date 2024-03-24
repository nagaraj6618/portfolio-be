const adminSchema = require('../model/admin.js');
const jwt = require('jsonwebtoken')
const checkingMethod = (req,res) => {
   res.send("Auth working...");
}


const registerMethod = async(req,res) => {
   try{
      const newUser = new adminSchema(req.body);
      await newUser.save();
      res.status(200).json({message:"Admin Registered Successfully",data:newUser})
   }
   catch(error){
      res.status(500).json({message:`error ${error}`});
   }

}
const loginMethod = async(req,res) => {
   try{
      const {email,password} = req.body;
      const user = await adminSchema.find({email:email,password:password});
      if(user.length==0){
         return res.status(400).json({message:"Invalid email or password"})
      }
      const token = jwt.sign(
         {
            id:user[0]._id,
            role:user[0].role
         },
         process.env.JWT_SECERETKEY,
         {  expiresIn : '1h' }
      );
      res.cookie('accessToken',token,
      {
         httpOnly: true,
         secure: true,
         sameSite: 'None',
         expires: new Date(Date.now() + 3600000),
      },

      ).status(200).json({message:"Login Successfull",token:token});
      
   }
   catch(error){
      res.status(500).json({error:`error : ${error}`});
   }
}


const verifyToken = (token) => {
   let reqUser = null;
   if(!token){
      return null
   }
   jwt.verify(
      token,process.env.JWT_SECERETKEY,(err,user) => {
         if(err){
            return null
         }
         reqUser=user; 
      }
   )
   return reqUser;
}

const verifyAdmin = (req,res,next) => {
   console.log(req)
   const user = verifyToken(req.cookies.accessToken)

   if(user && user.role === 'admin'){
      next()
   }
   else{
       res.status(401).json({  message: "Not Authenticated" })
   }
}
module.exports = {checkingMethod,registerMethod,loginMethod,verifyAdmin}