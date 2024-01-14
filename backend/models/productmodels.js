const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    Price:{
        type:Number,
        required:[true,"please enter product price"],
        maxlength:[8,"price cannot exceed 8 digits"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[4,"stock cannot exceed 4 digits"],
        default : 1
    },
    numberofreviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"user",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Product",productSchema);