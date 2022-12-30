const jwt = require("jsonwebtoken")

const secretCode = "abcdefgh1354654654hkj"

const adminAuth = (req, res, next)=>{
    try{
        let token =  req.headers.authorization;
        if (token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, secretCode);
            req.userId = user.id;
        }
        else{
            res.status(401).json ( {message : "Unauthorized user"})
        }
        next();
    }catch(error){
        console.log(error)
        res.status(401).json({message : "Unauthorized User"})

    }
}

module.exports = adminAuth