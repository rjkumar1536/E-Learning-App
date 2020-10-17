const express  = require('express');
const router = express.Router();
const {signup, login, student_detail, logout} = require('../controllers/student');
const  {authenticate}=require('../middleware/student-auth');

router.post('/signup', signup);
router.post('/signin', login);
router.get('/me', authenticate, student_detail);
router.delete('/me/token', authenticate, logout)

module.exports = router;