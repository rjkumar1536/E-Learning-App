const express  = require('express');
const router = express.Router();
const {signup, login, teacher_detail, logout} = require('../controllers/teacher');
const  {authenticate}=require('../middleware/teacher-auth');

router.post('/signup', signup);
router.post('/signin', login);
router.get('/me', authenticate, teacher_detail);
router.delete('/me/token', authenticate, logout)

module.exports = router;