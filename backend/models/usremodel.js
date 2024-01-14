const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");


const Userschema=new mongoose.Schema(
    {
        name:{
            type:String,
            requires:[true,"please enter your name"],
            maxlenght:[30,"name cannot exceed 30 characters"],
            minlength:[4,"name should have more than 4 characters"]
        },
        email:{
            type:String,
            required:[true,"please enter your email"],
            validate:[validator.isEmail,"please enter a valid email"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"please enter a password"],
            minlength:[8,"password should have more than 8 characters"],
            select:false
        },
        createAt:{
            type:Date,
            default:Date.now
        },
        avatar:{
                public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        },
        role:{
            type:String,
            default:"user"
        },
        resetpasswordToken:String,
        resetpasswordExpire:Date

    }
);

Userschema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

//JWT TOKEN
Userschema.methods.getJwtToken=function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
}

//compare password
Userschema.methods.comparePassword=async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword,this.password);
}

//Generating reset password token
Userschema.methods.getresetPassword=function(){

    const resetToken=crypto.randomBytes(20).toString("hex");

    this.resetpasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetpasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}

module.exports=mongoose.model("User",Userschema);