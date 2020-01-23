const express = require('express');
const router = express.Router(); 

const {signup, signin, signout, requireSignin} = require('../controllers/auth');
const {userSignupValidator} = require('../validator'); 

//get the controller out, and import as above
//Maybe, I should put all the controllers into index, and 
// and, export again. all. 
router.post('/signup', userSignupValidator, signup); 
router.post('/signin', signin); 
router.get("/signout", signout); 




module.exports=router; 

