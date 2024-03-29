import React, { Fragment, useState,useEffect } from "react";
import "./UpdatedPassowrd.css";
import Loader from "../layout/Loader/Loader";
import {useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstans";
import MetaData from "../layout/Metadata";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatedPassword = ()=>{

    const alert=useAlert();
    const navigate=useNavigate();

    const dispatch=useDispatch();

    const {error,isUpdated,loading}=useSelector((state)=>state.profile);

    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    
    

     const updatePasswordSubmit=(e)=>{
        e.preventDefault();

        const myform=new FormData();

        myform.set("oldPassword",oldPassword);
        myform.set("newPassword",newPassword);
        myform.set("confirmPassword",confirmPassword);

        dispatch(updatePassword(myform));
   }


   useEffect(()=>{
    
       if(error){
           alert.error(error);
           dispatch(clearErrors());
       }
       if(isUpdated){
           alert.success("Profile updated successfully");
           navigate("/account");

           dispatch({
            type:UPDATE_PASSWORD_RESET
           })
       }

   },[dispatch,error,alert,navigate,isUpdated]);
    return (
        <Fragment>
            {loading ? <Loader/> : <Fragment>
        <MetaData title="Change Password" />
        <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Change Password</h2>


            <form
                    className="updatePasswordForm"
                    onSubmit={updatePasswordSubmit}
                    >
                    <div className="loginPassword">

                    <VpnKeyIcon/>
                    <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}

                    />
                    </div>

                    <div className="loginPassword">

                    <LockOpenIcon/>
                    <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}

                    />
                    </div>

                    <div className="loginPassword">

                    <LockIcon/>
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}

                    />
                    </div>
                    

                    <input 
                        type="submit"
                        value="Change"
                        className="updatePasswordBtn"
                        
                    />


                    </form>
            </div>
            </div>
            </Fragment>}
        </Fragment>
    );
}


export default UpdatedPassword;