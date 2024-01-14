const Product=require("../models/productmodels");
const Errorhander = require("../utils/errorhander");
const error=require("../middleware/error");
const catchAsyncErrors=require("../middleware/catchasyncerrors");
const Apifeatures=require("../utils/apifeatures");
const cloudinary=require("cloudinary");


//create product --ADMIN
exports.CreateProduct=catchAsyncErrors(async(req,res,next)=>{
  
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;



    req.body.user=req.user.id;

    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});


//get all rpoducts
exports.getAllproducts= catchAsyncErrors(async(req,res,next)=>{

    const resultperpage=8;

    const productsCount=await Product.countDocuments();
    const apiFeatures=new Apifeatures(Product.find(),req.query).search().filter();

    let products = await apiFeatures.query;

    let filteredProductsCount=products.length;

    apiFeatures.pagination(resultperpage);
    
    res.status(200).json({success:true,products,productsCount,resultperpage,filteredProductsCount});
});


//get all products -- admin
exports.getAdminproducts= catchAsyncErrors(async(req,res,next)=>{

    const products=await Product.find();
    
    res.status(200).json({
        success:true,
        products});
});

//Update products--admin

exports.Updateproduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhander("product not found",404));
}

// Images Start Here
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

if (images !== undefined) {
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}



     product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
     });

     res.status(200).json({
        success:true,
        product
     })
});


//get single product details
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhander("product not found",404));
}
res.status(200).json({
    success:true,
    product,
});
});

//delete product--admin

exports.deleteproduct=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new Errorhander("product not found",404));
}

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }


    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success:true,
        message:"product removed successfully"})
});

// Create and update product review
exports.CreateProductReview=catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productId}=req.body;

    

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    };


    const product=await Product.findById(productId);

    const isreviewed= product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString());

    if(isreviewed){
    product.reviews.forEach((rev)=>{
    if(rev.user.toString()===req.user._id.toString()){
        rev.rating=rating;
        rev.comment=comment;
    }
})
    }
    else{
        product.reviews.push(review);
        product.numberofreviews=product.reviews.length;
    }

    let avg=0;

   product.reviews.forEach((rev)=>{
        avg+=rev.rating
    });

    product.ratings=avg/product.numberofreviews;


    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true
    });


});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });