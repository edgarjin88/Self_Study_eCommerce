const express = require('express');
const router = express.Router(); 

const {userById, read, update} = require('../controllers/user');
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth'); 

router.get('/secret/:userId', requireSignin, isAdmin, (req, res)=>{
  res.json({
    //retrieve profile from req.profile
    user: req.profile
  })
})

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);


router.param('userId', userById)
//isn't it dangerous? 
//also, user param can be used for other purpose. would it check anyway? 
module.exports=router; 