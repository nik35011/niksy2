//creating token and saving in cookie

const sendToken=(user,statuscode,res)=>{
    const token=user.getJwtToken();

    const option={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
        httponly:true
    }

    res.status(statuscode).cookie("token",token,option).json({
        success:true,
        user,token
    })
}

module.exports=sendToken;