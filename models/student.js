const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

var StudentSchema= new mongoose.Schema({
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
    studentId: {
        type:String,
        required:true
    },
    parentId: {
        type: String
    },
    class: {
        type: Number,
        required: true
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
StudentSchema.methods.toJSON=function(){
    var student=this;
    var studentObject=student.toObject();

    return _.omit(studentObject,['password','tokens']);
};
StudentSchema.methods.generateAuthToken=function(){
    var student=this;
    var access='auth';
    var token=jwt.sign({_id:student._id.toHexString(),access},process.env.JWT_SECRET).toString();

    student.tokens.push({access,token});
    return student.save().then(()=>{
        return token;
    });
};

StudentSchema.methods.removeToken=function(token){
    var student=this;
    return student.updateOne({
        $pull:{
            tokens:{token}
        }
    });
};

StudentSchema.statics.findByToken=function(token){
    var Student=this;
    var decoded;

    try{
       decoded= jwt.verify(token,process.env.JWT_SECRET);
    }catch(e){
        return Promise.reject();
    }
    return Student.findOne({
        _id:decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

StudentSchema.statics.findByCredentials=function(studentId,password){
    var Student=this;
   return Student.findOne({studentId}).then((student)=>{
        if(!student){
            return Promise.reject({message:`No student found with registration id ${studentId}`});
        }

        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,student.password,(err,res)=>{
                if(res){
                    resolve(student);
                }else{
                    reject(err);
                }  
            });
        });
    });
};

StudentSchema.statics.findByStudentId = function(studentId){
    var Student= this;
    return Student.findOne({studentId}).then((student) => {
        if(!student){
            return Promise.reject({message:`No student found with registration id ${studentId}`})
        }
        return new Promise((resolve, reject) => {
            resolve(student)
        })
    })
}

StudentSchema.pre('save',function(next){
    var student=this;
    if(student.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(student.password,salt,(err,hash)=>{
                student.password=hash;
                next();
            });
        });
    }else{
        next();
    }
})

var Student=mongoose.model('Student',StudentSchema);

module.exports= Student;