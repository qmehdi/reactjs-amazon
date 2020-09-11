import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  // Shoot the item into the dataLayer
  // const [state, dispatch] = useStateValue();
  const [{ basket }, dispatch] = useStateValue();

  console.log("This is the basket >>> ", basket);

  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      //This dispatch is like a gun, allows you to shoot items into the data layer
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} />

      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
