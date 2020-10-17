const _=require('lodash');
const Teacher = require('../models/teacher');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req,res) => {
   const teacher = new Teacher(req.body);
   teacher.save().then(()=>{
    return teacher.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(teacher);
    }).catch((e)=>{
        console.log(e)
        let err=errorHandler(e);
        res.status(400).json({
            err
        });;
    })
};

exports.login = (req,res) => {
    var body=_.pick(req.body,['teacherId','password']);

    Teacher.findByCredentials(body.teacherId,body.password).then((teacher)=>{
        return teacher.generateAuthToken().then((token)=>{
            
            res.header('x-auth',token).send(teacher);
        })
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e);
    });
 };

exports.teacher_detail = (req,res) => {
    if(req.teacher){
        res.status(200).send(req.teacher);
    }  
}

exports.logout = (req,res) => {
    req.teacher.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
}

