const Errorhander = require("../utils/errorhander");
const catchasyncerrors = require("./catchasyncerrors");
const jwt=require("jsonwebtoken");
const User=require("../models/usremodel");


exports.isAuthenticated=catchasyncerrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new Errorhander("Please login to access this resource",401));
    }

    const decodeData=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decodeData.id);
    next();
});

exports.authorizeroles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(new Errorhander(`Role : ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}