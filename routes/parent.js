const express  = require('express');
const router = express.Router();
const {signup, login, parent_detail, logout} = require('../controllers/parent');
const  {authenticate}=require('../middleware/parent-auth');

router.post('/signup', signup);
router.post('/signin', login);
router.get('/me', authenticate, parent_detail);
router.delete('/me/token', authenticate, logout)

module.exports = router;