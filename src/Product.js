import React from "react";
import "./Product.css";

function Product() {
  return (
    <div className="product">
      <div className="product__info">
        <p>The lean startup</p>
        <p className="product_price">
          <small>$</small>
          <strong> 19.99</strong>
        </p>
        <div className="product__rating">
          <p>@</p>
        </div>
      </div>

      <img src="https://m.media-amazon.com/images/I/51PAIR77wJL._SL500_.jpg" />
      
      <button>Add to basket</button>
    </div>
  );
}

export default Product;
