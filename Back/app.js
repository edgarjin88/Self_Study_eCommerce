
//app
const express = require('express'); 
const app =express(); 
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8000; 
const dotenv = require('dotenv');
const expressValidator = require('express-validator'); 
const cors = require('cors');
dotenv.config(); 
// app runs in process, just like in browser we have document objects, in node, we have 
// process

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')

//db
mongoose.connect(
  process.env.DATABASE, 
    {useNewUrlParser: true,
      useCreateIndex: true}
).then(()=> console.log('DB Connected'))

mongoose.connection.on('error', err=>{
  console.log(`DB connection error: ${err.message}`); 
})

//other middleware
app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(cookieParser()); 
app.use(expressValidator()); 
app.use(cors()); 


//routes middleware
app.use("/api", authRoutes); 
app.use("/api", userRoutes); 
app.use("/api", categoryRoutes); 
app.use("/api", productRoutes); 
app.use("/api", braintreeRoutes); 
app.use("/api", orderRoutes); 


app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`); 
})