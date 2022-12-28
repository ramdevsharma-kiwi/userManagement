const User = require('../models/users');


module.exports.home = function(req, res){
    return res.end('<h1>User Management System..!</h1>')
}
