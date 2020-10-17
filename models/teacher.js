const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

var TeacherSchema= new mongoose.Schema({
    name: String,
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    teacherId:{
        type: String,
        required:true
    },
    class: {
        type: Number
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
},
{ 
    usePushEach: true 
});
TeacherSchema.methods.toJSON=function(){
    var teacher=this;
    var teacherObject=teacher.toObject();

    return _.omit(teacherObject,['password','tokens']);
};
TeacherSchema.methods.generateAuthToken=function(){
    var teacher=this;
    var access='auth';
    var token=jwt.sign({_id:teacher._id.toHexString(),access},process.env.JWT_SECRET).toString();

    teacher.tokens.push({access,token});
    return teacher.save().then(()=>{
        return token;
    });
};

TeacherSchema.methods.removeToken=function(token){
    var teacher=this;
    return teacher.updateOne({
        $pull:{
            tokens:{token}
        }
    });
};

TeacherSchema.statics.findByToken=function(token){
    var Teacher=this;
    var decoded;

    try{
       decoded= jwt.verify(token,process.env.JWT_SECRET);
    }catch(e){
        return Promise.reject();
    }
    return Teacher.findOne({
        _id:decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

TeacherSchema.statics.findByCredentials=function(teacherId,password){
    var Teacher=this;
   return Teacher.findOne({teacherId}).then((teacher)=>{
        if(!teacher){
            return Promise.reject(`No teacher found with registration id ${teacherId}`);
        }

        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,teacher.password,(err,res)=>{
                if(res){
                    resolve(teacher);
                }else{
                    reject(err);
                }  
            });
        });
    });
};

TeacherSchema.pre('save',function(next){
    var teacher=this;
    if(teacher.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(teacher.password,salt,(err,hash)=>{
                teacher.password=hash;
                next();
            });
        });
    }else{
        next();
    }
})
var Teacher=mongoose.model('Teacher',TeacherSchema);

module.exports= Teacher;