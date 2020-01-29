const Product = require("../models/product");
const formidable = require('formidable');
const _ = require('lodash'); 
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require('fs')

exports.productById = (req, res, next, id) =>{
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product = product;
      console.log("product: ", product);
      next();
    });
}
exports.read=(req, res)=>{
  req.product.photo = undefined // not sending at this point. 
  return res.json(req.product) // but this is a wrong structure. It should not access photo db from the beginning. 
}

exports.remove = (req, res) => {
  let product =req.product
  product.remove((err, deletedProduct)=>{
        if(err || !product){
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
    message:"product deleted "})

  })
  
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions =true; //regardless of imagy type, extensions would be there 
  form.parse(req, (err, fields, files)=>{
    if(err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }

    //check for all fields
    const {name, description, price, category, quantity, shipping} = fields;
    
    if(!name|| !description ||!price ||!category ||!quantity||!shipping){
      return res.status(400).json({error: "All fields are required"})
    }

    let product  = new Product(fields); //form data would go into fields; 
    if(files.photo){
      console.log('filesphoto: ', files.photo)
      if(files.photo.size > 10000000){
        return res.status(400).json({
          error: "Image should be less than 1mg in size"
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path); 
      product.photo.contentType = files.photo.type //jpg, jpeg, or whatever from client side. 
    }

    product.save((err, result)=>{
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json(result); 
    })
  })
};


// update


exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true; //regardless of imagy type, extensions would be there
  //but what it is?
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    //check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let product = req.product; 
    product = _.extend(product, fields)

    if (files.photo) {
      console.log("filesphoto: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mg in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type; //jpg, jpeg, or whatever from client side.
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    });
  });
};

exports.list= (req, res)=>{
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.order : '_id' // order would be asc as defined above. 
  let limit = req.query.limit ? parseInt(req.query.limit): 6
  // otherwise, it would be string

  Product.find()
  .select("-photo") // no photo to be selected at this point 
  .populate('category') // as product refers category id, ref:Category
  .sort([[sortBy, order]]) //order matters here?? 
  .limit(limit)
  .exec((err, products)=>{
    if(err){
      return res.status(400).json({
        error: 'Products not found'
      })
    }
    res.send(products);
  })
}

//arrival, sell
//by sell =/products?sortBy=sold&order=desc&limit=4
//by arrival =/products?sortBy=createdAt&order=desc&limit=4
// with no URLSearchParams, all products are returned
// //It would find the products based ont he req product category 
// Other products that has the same category, will be returned. 

exports.listRelated= (req, res)=>{ 

  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({ id: { $ne: req.product }, category: req.product.category }) //not equal
    .limit(limit)
    .populate('category', '_id name') // '_id, name fields IN category collection' 
    .exec((err, products)=>{
          if (err) {
            return res.status(400).json({
              error: "Products not found"
            });
          }
          res.json(products)
          console.log('listrelated fired :', products)
    })

}

exports.listCategories = (req, res) =>{
  Product.distinct("category", {},(err, categories)=>{
//second argument is query
//if the categories are not used, it would not return it. 
              if (err) {
                return res.status(400).json({
                  error: "Products not found"
                });
              }
            res.json(categories);
  } ) 
}

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key]; //copying from req to findArg object. 
      }
    }
  } 
  //  findArgs updated
  Product.find(findArgs)
    .select("-photo") //except photo
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found"
        });
      }
      res.json({
        size: data.length,
        data
      });
    });
};

exports.photo = (req, res, next)=>{
  if(req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType) //jpg, jpeg, ...
    return res.send(req.product.photo.data)
  }
  next();
  
}


exports.listSearch = (req, res) =>{
  //create query object o hold search value and category value. 
  const query ={}
  //from frontend ->     list({search: search || undefined, category: category})
  if(req.query.search){
    query.name ={$regex: req.query.search, $options: 'i'} //mongodb options, 'i' case insensitive
    //req.query.search == value, e.g.) "Python"
    
    // assign category value to query.category
    if(req.query.category && req.query.category != 'All'){
      query.category = req.query.category
    }
    //find the product based on query object with 2 properties
    // search and category. 
    Product.find(query, (err, products)=>{
      if(err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json(products) //-photo to be here?
    }).select("-photo"); // still required??
  }
}



exports.decreaseQuantity = (req, res, next) =>{
  let bulkOps = req.body.order.products.map((item)=>{
    return {
      updateOne: {
        filter: {_id: item._id},
        update: {$inc: {quantity: -item.count, sold: +item.count}}
      }
    }
  })
  console.log('bulk :', bulkOps);
  Product.bulkWrite(bulkOps, {}, (error, products)=>{
    if(error){
      return res.status(400).json({
        error: "Could not update product"
      })
    }
    next(); 
  });
}