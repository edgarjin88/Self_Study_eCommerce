const express = require("express");
const router = express.Router();

const { userById, addOrderToUserHistory} = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { create, listOrders } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create); 
//create is order create, in other words, order record. 

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders)

router.param("userId", userById);
// router.param("use")
module.exports = router;
