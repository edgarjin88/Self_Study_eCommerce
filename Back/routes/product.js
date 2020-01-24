const express = require("express");
const router = express.Router();

const {
  remove,
  read,
  create,
  productById,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");


router.get('/product/:productId', read); 
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, remove); 
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);
router.get('/product/photo/:productId', photo)



router.get('/products', list); 
router.get('/products/related/:productId', listRelated); 
router.get('/products/categories', listCategories)



router.post("/products/by/search", listBySearch);
//post.  Searching condition would be sent through body this time. 


router.param("productId", productById);
router.param("userId", userById); // now, req would have user profile
//if there is any params, it would start automatically. 
// router.param("userId", userById);
//isn't it dangerous?
//also, user param can be used for other purpose. would it check anyway?



module.exports = router;
