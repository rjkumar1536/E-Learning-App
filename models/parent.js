const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

var ParentSchema= new mongoose.Schema({
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
    parentId:{
        type: String,
        required:true
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
ParentSchema.methods.toJSON=function(){
    var parent=this;
    var parentObject=parent.toObject();

    return _.omit(parentObject,['password','tokens']);
};
ParentSchema.methods.generateAuthToken=function(){
    var parent=this;
    var access='auth';
    var token=jwt.sign({_id:parent._id.toHexString(),access},process.env.JWT_SECRET).toString();

    parent.tokens.push({access,token});
    return parent.save().then(()=>{
        return token;
    });
};

ParentSchema.methods.removeToken=function(token){
    var parent=this;
    return parent.updateOne({
        $pull:{
            tokens:{token}
        }
    });
};

ParentSchema.statics.findByToken=function(token){
    var Parent=this;
    var decoded;

    try{
       decoded= jwt.verify(token,process.env.JWT_SECRET);
    }catch(e){
        return Promise.reject();
    }
    return Parent.findOne({
        _id:decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

ParentSchema.statics.findByCredentials=function(parentId,password){
    var Parent=this;
   return Parent.findOne({parentId}).then((parent)=>{
        if(!parent){
            return Promise.reject({message: `No parent found with for student ${parent.studentId}`});
        }

        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,parent.password,(err,res)=>{
                if(res){
                    resolve(parent);
                }else{
                    reject(err);
                }  
            });
        });
    });
};

ParentSchema.pre('save',function(next){
    var parent=this;
    if(parent.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(parent.password,salt,(err,hash)=>{
                parent.password=hash;
                next();
            });
        });
    }else{
        next();
    }
})

var Parent = mongoose.model('Parent',ParentSchema);

module.exports= Parent;