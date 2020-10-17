const Teacher = require('../models/teacher')

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    Teacher.findByToken(token).then((teacher)=>{
        if(!teacher){
            return Promise.reject();
        }
        // res.send(user);
        req.teacher=teacher;
        req.token=token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    });
};

module.exports={authenticate};