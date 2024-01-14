const Errorhander = require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchasyncerrors");
const User=require("../models/usremodel");
const sendToken=require("../utils/jwtToken")
const sendEmail=require("../utils/sendMail");
const crypto=require("crypto");
const cloudinary=require("cloudinary");




//register a user

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    // const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
    //     folder:"avatars",
    //     width:150,
    //     crop:"scale"
    // });


    const{name,email,password}=req.body;

    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"samlpe",
            url:"sample"
        }
    });

    sendToken(user,201,res);
});

//USER LOGIN

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{

    const{email,password}=req.body;
    //checking for user has given email & password
    if(!email || !password){
        return next(new Errorhander("Please enter Email & Password",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new Errorhander("Invalid Email or Password",401));
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new Errorhander("Invalid Email or Password",401));
    }
    
    sendToken(user,200,res);
});

//Logout user

exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
    
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httponly:true
    })

    res.status(200).json({
        success:true,
        message:"logged out successfully"
    })
});

//Forgot password
exports.ForgetPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhander("user not found",404));
    }
    const resetToken=user.getresetPassword();

    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message=`Your password reset Token is: \n\n${resetPasswordUrl}\n\n if you have not requested this email then,please ignore it.`;


    try{
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery",
            message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    }catch(error){
        user.resetpasswordToken=undefined;
        user.resetpasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new Errorhander(error.message,500));

    }
});

//reset password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{

    //creating token hash
    const resetpasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
        resetpasswordToken,
        resetpasswordExpire:{$gt:Date.now()}
    });

    if(!user){
        return next(new Errorhander("reset password token is Invalid or has been expired",404));
    }

    if(req.body.password !== req.body.confirmpassword){
        return next(new Errorhander("password does not match password",400));
    }
    user.password=req.body.password;
    user.resetpasswordToken=undefined;
    user.resetpasswordExpire=undefined;

    await user.save();
    sendToken(user,200,res);
   
});

//Get user Details
exports.GetUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user= await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    });
});


//Update user password
exports.UpdatePassword=catchAsyncErrors(async(req,res,next)=>{
    
    const user= await User.findById(req.user.id).select("+password");
    
    
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched){
        return next(new Errorhander("Old password is incorrect ",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new Errorhander("password does not match",400));
    }

    user.password=req.body.newPassword;

  await user.save();
  sendToken(user,200,res);
});

//Update user profile
exports.UpdateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }

    //add clodinary later
    if(req.body.avatar !==""){
        const user=await User.findById(req.user.id);

        const imageId=user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale"
        });

        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    }

    const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        sucess:true
    })

});

//Get all users -- admin
exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })
});

//Get single user Detail -- admin
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new Errorhander(`User does not exists with id: ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
});

// Admin Update user role  -- admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

// Admin Delete User   -- admin
exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new Errorhander(`User does not exists with id:${req.params.id}`,404));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne();
    res.status(200).json({
        sucess:true,
        message:"User deleted successfully"
    })

});