const jwt = require("jsonwebtoken");
const config = require("config");

// @route  any
// @desc   Auntheticate user & get token
// @access public  
module.exports = function(req,res,next){
    let token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg : "No token , Authorization denied"});
    }

    try{
        const decoded = jwt.verify(token, config.get("secret"));
        req.user = decoded.user;
        next();
    }
    catch(err){
        return res.status(401).json({msg : "Token is Invalid"});
    }
}