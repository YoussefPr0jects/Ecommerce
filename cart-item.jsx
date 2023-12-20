import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import "./cart.css";

export const CartItem = (props) => {
  const { id, name, price, image, qty } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount, products } = useContext(ShopContext);

  const productInfo = products.find((product) => product.id === id);
  if (!productInfo) {
    return (
      <div className="cartItem">
        <p>Product information not available.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (cartItems[id] < qty) {
      addToCart(id);
    } else {
      alert('Cannot add more items. Quantity limit reached.');
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className="cartItem">
      <img src={`assets/products/${image}`} alt={`Product ${id}`} />
      <div className="description">
        <p>
          <b>{productInfo.name}</b>
        </p>
        <p>${productInfo.price * cartItems[id]}</p>
        <div className="countHandler">
          <button className="addSub" onClick={handleRemoveFromCart}>
            {" "}
            -{" "}
          </button>
          <input
            value={cartItems[id]}
            readOnly 
          />
          <button className="addSub" onClick={handleAddToCart}>
            {" "}
            +{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
