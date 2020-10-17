const _=require('lodash');
const Student = require('../models/student');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req,res) => {
   const student = new Student(req.body);
   student.save().then(()=>{
    return student.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(student);
    }).catch((e)=>{
        let err=errorHandler(e);
        res.status(400).json({
            err
        });;
    })
};

exports.login = (req,res) => {
    var body=_.pick(req.body,['studentId','password']);

    Student.findByCredentials(body.studentId,body.password).then((student)=>{
        console.log('student found...', student)
        return student.generateAuthToken().then((token)=>{
            
            res.header('x-auth',token).send(student);
        })
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e);
    });
 };

exports.student_detail = (req,res) => {
    if(req.student){
        res.status(200).send(req.student);
    }  
}

exports.logout = (req,res) => {
    req.student.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
}

