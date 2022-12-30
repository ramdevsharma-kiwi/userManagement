const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser')
const joi = require('joi');

const secretCode = "fahfkjdkafdsfa"

const UserModel = require('../models/users');

// to validate the login Schema
const signInSchema = joi.object({
    email : joi.string().required().email(),
    password : joi.string().required().min(6)
})


// to validate the register schema
const signUpSchma = joi.object({
    email : joi.string().required().email(),
    name : joi.string().min(3).max(20).required(),
    phoneNo: joi.string().min(9).max(14).required(),
    address: joi.string().min(10).max(50).required(),
    password: joi.string().min(6).required()

})

// to test the routers
module.exports.testuser = function(req, res){
    return res.end('<h1>Fine haii...!</h1>')
}


// register function started 

module.exports.signUp = async (req , res)=>{
    const bool = signUpSchema.validate({
        name:req.body.name,
				email:req.body.email,
				password: hashedPassword,
				phoneNo: req.body.phoneNo,
				address:req.body.address

    })
    if(bool.error != undefined){
        res.send(bool.error.details[0].message);
       }
    else{ 
          try{
        console.log(req.body)
        const existingUser = await UserModel.findOne({email : req.body.email })
       if (existingUser){
        return res.status(400).json({message : "Email Already exists"})
       }
       const hashedPassword = await bcrypt.hash(req.body.password,10)
       const result = await UserModel.create({
                name:req.body.name,
				email:req.body.email,
				password: hashedPassword,
				phoneNo: req.body.phoneNo,
				address:req.body.address
       })
       res.status(500).json({user: result})
       
   console.log("user registered")
   }
   catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong.."})
   }

}}


// -----------




//  Login function

module.exports.signIn = async (req , res)=>{
    const bool = signInSchema.validate({email : req.body.email , password : req.body.password});
   if(bool.error != undefined){
    res.send(bool.error.details[0].message);
   }
   else
   {
    try{
        const existingUser = await UserModel.findOne({email : req.body.email })
        if (!existingUser){
         return res.status(400).json({message : "User not found"})
        }
      const matchPassword = await bcrypt.compare(req.body.password,existingUser.password);
        if(!matchPassword){
            return res.status(404).json({message : "Invalid Credentials"})
        }
        const token = 'Bearer ' + jwt.sign({email : existingUser.email , id : existingUser._id },secretCode );
        res.status(201).json({ user : existingUser, token : token})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong.."})
   }
}
}
// ------------



module.exports.viewUsersProfile = async (req,res)=>{
    try{
        const user1 = await UserModel.findById({_id:req.userId})
        res.status(200).json(user1)

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"something went wrong.."})
   }
}


// --------

 module.exports.editProfile = async (req,res)=>{
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
// ---------

 module.exports.deleteProfile = async (req,res)=>{
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


// ---------------
// module.exports.signUp = function(req,res){
// 	console.log(req.body)
// 	User1.findOne({email:req.body.email})
// 	.then(user =>{
// 		if (user) {
// 			return res.status(400).json({email:'Email Already exists '})
// 		} 
// 		else{
			
// 			const newuser= new User1({
// 				name:req.body.name,
// 				email:req.body.email,
// 				password:req.body.password,
// 				phoneNo: req.body.phoneNo,
// 				address:req.body.address

// 			});
// 			bcrypt.genSalt(10,(err,salt)=>{
// 				bcrypt.hash(newuser.password,salt,(err,hash)=>{
// 					console.log(newuser)
// 					if(err) throw err;
// 					newuser.password=hash;
// 					newuser.save()
// 					.then(user=>res.json(user)).catch(err=>console.log(err));
// 				})
// 			})
// 		}
// 	})

// }

// module.exports.signIn = function(req,res) {
// 	// body...
// 	const email=req.body.email
// 	const password=req.body.password
// 	User1.findOne({email:email})
// 	.then(user =>{
// 		if (!user) {
// 			res.status(404).json({email:'Email not found'})
// 		}
// 		bcrypt.compare(password,user.password)
// 		.then(isMatch=>{
// 			if (isMatch) {
// 			const payload={id:user.id,name:user.name}

// 			jwt.sign(payload,key.secret,{expiresIn:3600},(err,token)=>{
// 				res.json({
// 					success:true,
// 					token:'Bearer '+token,
// 					user_information : user
// 				})
// 			})
// 		   }
// 		   else{
// 		   	res.status(400).json({Password:"Password incorrect"})
// 		   }
// 		})
// 	})
// 	console.log("logged in")
// }



// module.exports.userProfile = function(req,res){
// 	res.json({
// 		id:req.user.id,
// 		name:req.user.name,
// 		email:req.user.email,
// 		phoneNo:req.user.phoneNo,
// 		address:req.user.address

// 	})
// }


