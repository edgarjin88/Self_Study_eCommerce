const express = require("express");
const router = express.Router();

const { userById, addOrderToUserHistory} = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { create, listOrders, getStatusValues, orderById, updateOrderStatus } = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create); 
//create is order create, in other words, order record. 

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders)
router.get("/order/status-values/:userId", requireSignin, isAuth, isAdmin, getStatusValues)
// router.get("/order/status-values/:userId", requireSignin, isAuth, isAdmin, listOrders, getStatusValues)
//here is the question. why listOrders inturrpting getStatus Value?

router.put("/order/:orderId/status/:userId", requireSignin, isAuth, isAdmin, updateOrderStatus)

router.param("userId", userById);
router.param("orderId", orderById);
// router.param("use")
module.exports = router;
