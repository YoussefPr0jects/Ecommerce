import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { useUser } from '../../components/UserContext';
import { CartItem } from './cart-item';

export const Cart = () => {
  const { cartItems, getTotalCartAmount, getTotalCartItems, products } = useContext(ShopContext);
  const { customerId } = useUser();
  const totalAmount = getTotalCartAmount();
  const totalItems = getTotalCartItems();
  const navigate = useNavigate();

  const handleCheckout = () => {
    axios.post("http://localhost:8081/checkout", { customerId, cartItems, totalAmount })
      .then(res => {
        console.log(res.data);
        alert("Successful Order");
        navigate(`/order_confirmed/${res.data.orderId}`);
      })
      .catch(err => {  
        console.error(err);
        alert("Error during checkout");
      });
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items </h1>
      </div>
      <div className="cartItems">
        {Object.entries(cartItems).map(([productId, quantity]) => {
          if (quantity !== 0) {
            const product = products.find((product) => product.id === Number(productId));
            return <CartItem key={productId} data={product} />;
          }
          return null;
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount}</p>
          <p> Total Items: {totalItems}</p>
          <button onClick={() => navigate("/")}> Continue Shopping</button>
          <button onClick={handleCheckout}> Checkout</button>
        </div>
      ) : (
        <h1> Your cart is empty. </h1>
      )}
    </div>
  );
};
