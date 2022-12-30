const jwt=require('jsonwebtoken');

const auth = require("../middleware/auth")

const express = require('express')
const router = express.Router();
const path = require('path')
const multer = require("multer")


const usersController =  require('../controllers/user-controller')

const filepath = path.join(__dirname,"../uploads");

const object = multer({
    storage: multer.diskStorage({
        destination : function(req,file,callback){
            callback(null,filepath)
        },
        filename: function(req,file,callback){
            callback(null,file.originalname);
        }
    })
})

router.get("/test",usersController.testuser);

router.post("/sign-up",object.single('avatar'),usersController.signUp);

router.post("/sign-in",usersController.signIn);

router.get("/view-profile",auth ,usersController.viewUsersProfile)

router.delete("/view-profile/:id",auth,usersController.deleteProfile)

router.put("/view-profile/:id",auth ,usersController.editProfile)



module.exports = router;