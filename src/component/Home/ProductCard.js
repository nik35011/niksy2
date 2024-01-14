import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";




const ProductCard=({product})=>{
    const options={
       
        value:product.ratings,
        readOnly:true,
        precision:0.5
    };
    return(
<Link className="ProductCard" to={`/product/${product._id}`}>
<img src={product.images[0].url} alt={product.name}></img>
<p>{product.name}</p>
<div>
    <Rating {...options}/> <span className="productCardSpan">({product.numberofreviews} Reviews)</span>
</div>
<span>{`₹${product.Price}`}</span>
</Link>

    );
};

export default ProductCard;