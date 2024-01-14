const express=require("express");
const { getAllproducts,CreateProduct,Updateproduct,deleteproduct,getProductDetails,CreateProductReview, getProductReviews, deleteReview, getAdminproducts} = require("../controller/productcontroller");
const {isAuthenticated,authorizeroles}=require("../middleware/auth");
const Router=express.Router();

Router.route("/products").get(getAllproducts);
Router.route("/admin/products").get(isAuthenticated,authorizeroles("admin"),getAdminproducts);
Router.route("/admin/product/new").post(isAuthenticated,authorizeroles("admin"),CreateProduct);
Router.route("/admin/product/:id").put(isAuthenticated,authorizeroles("admin"),Updateproduct).delete(isAuthenticated,authorizeroles("admin"),deleteproduct);
Router.route("/product/:id").get(getProductDetails);

Router.route("/review").put(isAuthenticated,CreateProductReview);
Router.route("/reviews").get(getProductReviews).delete(isAuthenticated,deleteReview);
module.exports=Router;