const express = require("express")

const router = express.Router();
const homeController = require('../controllers/home-controller'); 

console.log(`router loaded`)
router.get('/', homeController.home);

// user router
router.use('/users',require('./users'))
router.use('/admin',require('./admin'))

module.exports = router;