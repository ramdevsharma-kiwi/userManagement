const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const bodyParser=require('body-parser')



// const User1=require('../models/users');
// const key=require('../config/keys');


module.exports.testuser = function(req, res){
    return res.end('<h1>Fine haii...!</h1>')
}





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


