const express=require("express");
const router=express.Router();
const { isAuthenticated,authorizeroles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controller/OrderController");

router.route("/order/new").post(isAuthenticated,newOrder);
router.route("/order/me").get(isAuthenticated,myOrders);
router.route("/order/:id").get(isAuthenticated,getSingleOrder);

router.route("/admin/orders").get(isAuthenticated,authorizeroles("admin"),getAllOrders);
router.route("/admin/order/:id").put(isAuthenticated,authorizeroles("admin"),updateOrderStatus).delete(isAuthenticated,authorizeroles("admin"),deleteOrder);

module.exports=router;