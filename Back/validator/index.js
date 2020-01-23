exports.userSignupValidator = (req, res, next) =>{
  req.check('name', 'Name is required').notEmpty();
  req.check('email', 'Email must be between 3 to 32 characters')
  .matches(/.+\@.+\..+/) //checking email
  .withMessage('Email must contain @')
  .isLength({
    min: 4,
    max: 32
  }); //not empty not required? 
  req.check('password', 'Password is required').notEmpty()
  req.check('password')
  .isLength({min: 6})
  .withMessage('Password must contain at least 6 Characters')
  .matches(/\d/)
  .withMessage("Password must contain a number"); 
  const errors = req.validationErrors(); 
  if(errors) {
    const firstError = errors.map(error => error.msg)[0]
    return res.status(400).json({error: firstError}); 
  }

  // if(req.body.name){
  //   console.log('name entered :',req.body.name );
  // }
  //hum... I don't think validator required. I rather manually make a set of 
  // customized ones. 
  next(); 
}