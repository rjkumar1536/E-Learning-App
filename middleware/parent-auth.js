const Parent = require('../models/parent')

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    Parent.findByToken(token).then((parent)=>{
        if(!parent){
            return Promise.reject();
        }
        // res.send(user);
        req.parent=parent;
        req.token=token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    });
};

module.exports={authenticate};