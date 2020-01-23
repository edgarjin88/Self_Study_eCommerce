const User = require('../models/user'); 


exports.userById = (req, res, next, id) =>{
  User.findById(id).exec((err, user)=>{
    // mongoos state. 

    if(err || !user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
    req.profile = user
    //profile would be returned
    next(); 
  }); 

}