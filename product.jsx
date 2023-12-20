import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useUser } from "../../components/UserContext"; 
import { useNavigate } from 'react-router-dom';
export const Product = (props) => {
  const { id, name, price, image, qty } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemAmount = cartItems[id];
  const { userName } = useUser(); 
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (userName) {
      // User is logged in
      if (cartItemAmount < qty) {
        addToCart(id);
      } else {
        console.warn('Cannot add more items. Quantity limit reached.');
      }
    } else {
        navigate("/login");    }
  };

  return (
    <div className="product">
      <img src={`assets/products/${image}`} alt={name} />
      <div className="description">
        <p><b>{name}</b></p>
        <p>${price}</p>
        <p>Quantity: {qty}</p> 
        <button className="AddToCartButton" onClick={handleAddToCart}>
          Add to Cart{cartItemAmount > 0 && <> ({cartItemAmount})</>}
        </button>
      </div>
    </div> 
  );
};
