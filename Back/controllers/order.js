const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const {Order, CartItem}= require('../models/order')
const {errorHandler}  = require('../helpers/dbErrorHandler'); 
// const Order = mongoose.model("Order", OrderSchema);

exports.orderById = (req, res, next, id)=>{
  console.log('orderby fired');
  Order.findById(id)
  .populate('products.product', 'name price') // to access product 
  .exec((err, order)=>{
    if(err || !order){
      return res.status(400).json({
        error: errorHandler(err)
      })
    } else{
      req.order = order;
      next(); 
    }
  })
}
exports.create = (req, res) =>{

  console.log('create order : ', req.body);
  req.body.order.user = req.profile // profile assigned. profile comes from userById.

  const order = new Order(req.body.order)
  order.save((error, data)=>{
    if(error){
      return res.status(400).json({
        error: errorHandler(error)
      })
    }
    res.json(data) 
  })
}


exports.listOrders = (req, res) =>{
  Order.find()
  .populate('user', '_id name address')
  .sort('-created')
  .exec((err, orders)=>{
    if(err){
      return res.status(400).json({error: errorHandler(error)}); 
    } 
    res.json(orders); 
  })
}

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

console.log('before "new" mongoos status: ', Order.schema.path('status').enumValues); 

let temp = new Order(); 
console.log('after "new" mongoos status: ', temp.schema.path('status').enumValues); 

// var Temp = mongoose.model('Temp', TempSchema);

// console.log(Temp.schema.path('salutation').enumValues);
// var temp = new Temp();
// console.log(temp.schema.path('salutation').enumValues);






exports.updateOrderStatus = (req, res) => {
  console.log('update ');
  Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(order);
  });
};
