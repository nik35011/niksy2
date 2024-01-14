const express=require("express");
const app=express();
const errormiddleware=require("./middleware/error");
const cookieparser=require("cookie-parser");
const bodyparser=require("body-parser");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");


//config
dotenv.config({path:"backend/config/config.env"});


app.use(express.json());
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileUpload());


//Routes import
const product=require("./routes/productroutes");
const user=require("./routes/userroute");
const order=require("./routes/orderRoute");
const payment=require("./routes/PaymentRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
//middleware for error

app.use(errormiddleware);


module.exports=app;