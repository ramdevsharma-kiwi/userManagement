const jwt=require('jsonwebtoken');

const auth = require("../middleware/auth")

const express = require('express')
const router = express.Router();



const usersController =  require('../controllers/user-controller')



router.get("/test",usersController.testuser);

router.post("/sign-up",usersController.signUp);

router.post("/sign-in",usersController.signIn);

router.get("/view-profile",auth ,usersController.viewUsersProfile)

// router.delete("/view-profile/:id",auth ,usersController.deleteProfile)

// router.put("/view-profile/:id",auth ,usersController.editProfile)



module.exports = router;