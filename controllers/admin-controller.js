const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser')
const joi = require('joi');

const secretCode = "abcdefgh1354654654hkj"

const UserModel = require('../models/users');

// to validate the login Schema
const signInSchema = joi.object({
    email : joi.string().required().email(),
    password : joi.string().required().min(6)
})


module.exports.signIn = async (req , res)=>{
    const bool = signInSchema.validate({email : req.body.email , password : req.body.password});
   if(bool.error != undefined){
    res.send(bool.error.details[0].message);
   }
   else
   {
    const AdminEmail = "admin@gmail.com";
    const AdminPassword = "Admin@123";
    
    try{
       
        if (req.body.email == AdminEmail){
            if (req.body.password == AdminPassword) {

         const existingUser = await UserModel.findOne({email : req.body.email })
        if (!existingUser){
         return res.status(400).json({message : "User not found"})
        }
      const matchPassword = await bcrypt.compare(req.body.password,existingUser.password);
        if(!matchPassword){
            return res.status(404).json({message : "Invalid Credentials"})
        }
        const token = 'Bearer ' + jwt.sign({email : existingUser.email , id : existingUser._id,name:existingUser.name },secretCode );
        res.status(201).json({ user : existingUser, token : token})
            }
               
    }
}
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong.."})
   }
}
}


// ------

//  to show the all users 

module.exports.userDetails = async (req,res)=>{
    try{
        const allusers = await UserModel.find()
        res.status(200).json(allusers)

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong.."})
   }
}


// ----
module.exports.deleteUser = async (req,res)=>{
    const id = req.params.id;
    try{

         await UserModel.findByIdAndRemove(id)
        res.status(202).json({message:" user deleted"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong.."})
    }
}


// ----
module.exports.editUser = async (req,res)=>{
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const newuser ={
                name:req.body.name,
				email:req.body.email,
				password: hashedPassword,
				phoneNo: req.body.phoneNo,
				address:req.body.address
    }
    try{
        await UserModel.findByIdAndUpdate(id,newuser,{new : true})
        res.status(200).json({message:"user details updated"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong.."})
    }
}