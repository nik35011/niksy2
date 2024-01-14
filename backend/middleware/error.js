const Errorhander=require("../utils/errorhander")

module.exports=(err,req,res,next)=>{
    err.statuscode=err.statuscode||500;
    err.message=err.message||"internal server error"


    //mongo DB error
    if(err.name==="CastError"){
        const message=`resources not found , Invalid ${err.path}`;
        err=new Errorhander(message,400);
    }


    //mongoose duplicate email error
    if(err.code===11000){
        
        const message=`User is already registered`;
        err=new Errorhander(message,400);
    }

    //wrong json web_token
    if(err.code==="JsonWebTokenError"){
        
        const message=`JsonWebToken is invalid ,try again`;
        err=new Errorhander(message,400);
    }

    //JWT expire error
    if(err.code==="TokenEpiredError"){
        
        const message=`JsonWebToken is expired , try again`;
        err=new Errorhander(message,400);
    }


    res.status(err.statuscode).json({success:false,
        error:err.message});
}