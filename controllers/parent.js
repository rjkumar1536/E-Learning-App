const _=require('lodash');
const Student = require('../models/student');
const Parent = require('../models/parent');
const {errorHandler} = require('../helpers/dbErrorHandler');
const {generateId} = require('../helpers/id-generator')

exports.signup = (req,res) => {
    Student.findByStudentId(req.body.studentId).then(async (student)=> {
        if(!student){
            res.status(404).json({
                message: `No student found with registration id ${req.body.studentId}.`
            })
        }
        let parentId = generateId(`PRT${req.body.studentId}`)
        const parent = new Parent(req.body);
        parent.parentId = parentId
        student.parentId = parentId
        await Student.findOneAndUpdate({studentId: student.studentId}, {$set: student}, {new: true})
        parent.save().then(()=>{
        return parent.generateAuthToken();
        }).then((token)=>{
            res.header('x-auth',token).send(parent);
        }).catch((e)=>{
            let err=errorHandler(e);
            res.status(400).json({
                err
            });
        })
    }).catch((ex) => {
        let err=errorHandler(ex);
        res.status(400).json({
            err
        });
    })
    
};

exports.login = (req,res) => {
    var body=_.pick(req.body,['studentId','password']);
    Student.findByStudentId(body.studentId).then((student) => {
        Parent.findByCredentials(student.parentId,body.password).then((parent)=>{
            return parent.generateAuthToken().then((token)=>{
                res.header('x-auth',token).send(parent);
            })
        }).catch((e)=>{
            console.log(e)
            let err=errorHandler(e);
            res.status(400).json({
                err
            });
        });
    }).catch((e)=>{
        console.log(e)
        let err=errorHandler(e);
        res.status(400).json({
            err
        });
    });
 };

exports.parent_detail = (req,res) => {
    if(req.parent){
        res.status(200).send(req.parent);
    }  
}

exports.logout = (req,res) => {
    req.parent.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
}

