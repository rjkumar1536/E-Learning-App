const router = require("express").Router();
const auth = require('../middleware/auth');
// const User = require('./../../models/User')
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const config = require("config")

// @route /api/auth
// @desc  get user data
// router.get('/', auth, async (req, res)=>{
//     try{
//        let user = await User.findById(req.user.id).select('-password')
//        res.json(user)
//     }
//     catch(err){
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// })

// // @route /api/auth
// // @desc  logging in
// router.post('/', [
//     check("email", "please incluse a valid email").isEmail(),
//     check("password", "please enter a password with 6 or more characters").exists()
// ],async (req, res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors : errors.array()});
//     }
//     const {email , password} = req.body;

//     try{
//         let user = await User.findOne({email});
//         if(!user){
//             res.status(404).json({errors : [{msg : "Invalid Credentials"}]});
//         }
//         else{
//             let result = await bcrypt.compare(password, user.password);
//             let payload = {
//                 user :{
//                     id : user.id
//                 }
//             }
//             if(result){
//                 jwt.sign(payload, config.get("secret"), {expiresIn : "30d"}, (err, token)=>{
//                     if(err) throw err
//                     res.json({token});
//                 })
//             }
//             else{
//                 res.status(400).json({errors : [{msg : "Invalid Credentials"}]});
//             }
//         }
//         // res.json({Authorization })
//     }
//     catch(err){
//         console.error(err.message);
//         return res.status(500).send("server Error");
//     }
// })
module.exports = router;