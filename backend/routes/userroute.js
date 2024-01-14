const express=require("express");
const { registerUser,
        loginUser,
        logoutUser,
        ForgetPassword,
        resetPassword,
        GetUserDetails,
        UpdatePassword,
        UpdateProfile,
        getAllUsers, 
        getSingleUser, 
        updateUserRole, 
        deleteUser } = require("../controller/usercontroller");

const { isAuthenticated,authorizeroles } = require("../middleware/auth");
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(ForgetPassword);
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticated,GetUserDetails);
router.route("/password/update").put(isAuthenticated,UpdatePassword);
router.route("/me/update").put(isAuthenticated,UpdateProfile);

router.route("/admin/users").get(isAuthenticated,authorizeroles("admin"),getAllUsers);

router.route("/admin/user/:id").get(isAuthenticated,authorizeroles("admin"),getSingleUser)
                               .put(isAuthenticated,authorizeroles("admin"),updateUserRole)
                               .delete(isAuthenticated,authorizeroles("admin"),deleteUser);


module.exports=router;