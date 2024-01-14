const Order= require("../models/Ordermodel");
const Product=require("../models/productmodels");
const Errorhander = require("../utils/errorhander");
const catchAsyncErrors=require("../middleware/catchasyncerrors");


// Creating new order
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const{shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;


    try{
      const order= await Order.create(
        {shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    }
    );
    
    res.status(201).json({
        success:true,
        order
    });
    }catch(error){
      console.log(error);
    }
});

// Get single order
exports.getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order= await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new Errorhander("Order not found with this Id",404));
    }

    res.status(200).json({
        success:true,
        order
    });
});

// Get logged in user orders
exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
    
    const orders= await Order.find({user:req.user});

    res.status(200).json({
        success:true,
        orders
    });
});

//Get all orders -- admin
exports.getAllOrders=catchAsyncErrors(async(req,res,next)=>{
    
    const orders= await Order.find();

    let totalAmt=0;
    orders.forEach((order)=>{
        totalAmt+=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        orders,
        totalAmt
    });
});


//Update order status -- admin
  exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const { status } = req.body;
  
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new Errorhander('Order not found', 404));
    }
  
    if (order.orderStatus === 'Delivered') {
      return next(new Errorhander('This order has already been delivered', 400));
    }
  
    order.orderStatus = status;


    
  
    if (status === 'Delivered') {
      order.deliverAt = Date.now();
  
      for (const item of order.orderItems) {
        //updating stock of product
        const product = await Product.findById(item.product);
            if (product) {
              product.stock -= item.quantity;
              await product.save({ validateBeforeSave: false }); 
            }
      }
    }
  
    await order.save();
  
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
    });
  });


//delete order -- admin
exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    
    const order= await Order.findById(req.params.id);

    if(!order){
        return next(new Errorhander("Order not found",404));
    }

    await order.deleteOne();
    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    });
});