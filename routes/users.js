const jwt=require('jsonwebtoken');


const express = require('express')
const router = express.Router();



const usersController =  require('../controllers/user-controller')



router.get("/test",usersController.testuser);

router.post("/sign-up",usersController.signUp);

router.post("/sign-in",usersController.signIn);

// router.get("/user-profile",usersController.userProfile,passport.authenticate('jwt',{session:false}));


module.exports = router;