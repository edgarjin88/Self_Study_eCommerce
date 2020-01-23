const express = require('express');
const router = express.Router(); 

const {userById} = require('../controllers/user');
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth'); 

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res)=>{
  res.json({
    //retrieve profile from req.profile
    user: req.profile
  })
})
router.param('userId', userById)
//isn't it dangerous? 
//also, user param can be used for other purpose. would it check anyway? 
module.exports=router; 