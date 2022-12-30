const express = require('express')
const router = express.Router();

const adminAuth = require("../middleware/adminAuth")
const adminController =  require('../controllers/admin-controller')

router.post("/sign-in",adminController.signIn);

router.get("/user-details",adminAuth,adminController.userDetails);

router.delete("/user-details/:id",adminAuth,adminController.deleteUser)

router.put("/user-details/:id",adminAuth,adminController.editUser)

module.exports = router;