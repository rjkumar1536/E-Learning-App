const Student = require('../models/student')

var authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    Student.findByToken(token).then((student)=>{
        if(!student){
            return Promise.reject();
        }
        // res.send(user);
        req.student=student;
        req.token=token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    });
};

module.exports={authenticate};