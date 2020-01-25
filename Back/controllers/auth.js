const User = require('../models/user'); 
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken') // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check

// bring model first, 
// and export codes to routes later. 

exports.signup = (req, res) =>{
  console.log('req.body :', req.body); 

  const user = new User(req.body); 
  //instance first. 
  user.save((err, user)=>{
    // error first
    if(err) {
      return res.status(400).json({
        err: errorHandler(err) 
      })
    }
    user.salt = undefined
    user.hashed_password = undefined;
    res.json({
      user
    })
  })
}

exports.signin =(req, res) =>{
  const {email, password} = req.body
  // User was declaired above. 
  User.findOne({email}, (err, user)=>{
    if(err || !user){
      return res.status(400).json({
        err: 'User with that email does not exist. Please signup'
      })
    }
    //if user is found, check the email and password
    //create authenticate method in user model. 
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: 'email and password do not match'
      })
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    //persist the token as 't' in cookie with expiry data
    res.cookie('t', token, {expire: new Date() + 9999}) //why expiry date was unlimited?? 
    //sets cookie in HEADER! 
    
    //return response with user and token to front
    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, email, name, role} })
    //res.cookie, res.json 
    //without return OK? test it tomorrow. 
  })
}

exports.signout = (req, res) =>{
  res.clearCookie('t'); 
  // clear cookie from browser. 
  res.json({message: "Signout Success"}); 
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
})

exports.isAuth = (req, res, next) =>{
  let user = req.profile && req.auth && req.profile._id == req.auth._id; 
  // under score. 
    if(!user){
      return res.status(403).json({
        error: "Access denied"
      })
    }
    next(); 
}

exports.isAdmin=(req, res, next) =>{
  if(req.profile.role==0){
    return res.status(403).json({
      error: "Admin resourse! Access denied"
    })
  }
  next(); 
}