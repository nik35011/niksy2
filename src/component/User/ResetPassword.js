import React, { Fragment, useState,useEffect } from "react";
import "./ResetPassowrd.css";
import Loader from "../layout/Loader/Loader";
import {useNavigate, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/Metadata";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";





const ResetPassword=()=>{

    const alert=useAlert();
    const navigate=useNavigate();
    const {token}=useParams();

    const dispatch=useDispatch();

    const {error,success,loading}=useSelector((state)=>state.forgotPassword);

    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmPassword]=useState("");
    
    

     const resetPasswordSubmit=(e)=>{
        e.preventDefault();

        const myform=new FormData();

        myform.set("newPassword",password);
        myform.set("confirmPassword",confirmpassword);

        dispatch(resetPassword(token,myform));
   }


   useEffect(()=>{
    
       if(error){
           alert.error(error);
           dispatch(clearErrors());
       }
       if(success){
           alert.success("Password updated successfully");
           navigate("/login");

       }

   },[dispatch,error,alert,navigate,success]);
    return(
        <Fragment>
        {loading ? <Loader/> : <Fragment>
    <MetaData title="Change Password" />
    <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
        <h2 className="resetPasswordHeading">Reset Password</h2>


        <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
                >
                

                <div >

                <LockOpenIcon/>
                <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}

                />
                </div>

                <div >

                <LockIcon/>
                <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}

                />
                </div>
                

                <input 
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                    
                />


                </form>
        </div>
        </div>
        </Fragment>}
    </Fragment>
    );
}

export default ResetPassword;