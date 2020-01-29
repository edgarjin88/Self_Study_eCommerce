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
    console.log('user fired: ', user);
    //this controller is to add user info to req.profile
    //profile would be returned
    next(); 
  }); 

}

exports.read = (req, res)=>{
  req.profile.hashed_password = undefined
  req.profile.salt = undefined;  //created by uuidv1
  return res.json(req.profile); 

}

exports.update = (req, res)=>{
  User.findOneAndUpdate({_id: req.profile._id}, 
    {$set: req.body}, //what ever in req.body would be updated
    {new:true}, //newly updated one would be sent as a JSON
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action"
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined; //created by uuidv1
      res.json(user); 
    }

  )
}

exports.addOrderToUserHistory = (req, res, next)=>{
  let history =[]

  req.body.order.products.forEach((item)=>{
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount

    })
  })

  User.findOneAndUpdate({_id: req.profile._id}, {$push:{history:history}}, { new: true}, 
    (error, data)=>{
      if(error){
        return res.status(400).json({
          error: 'Could not update user purchase history'
        })
      }
      next()
    })
}