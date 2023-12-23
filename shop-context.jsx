import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
    let cart = {};
    for (const product of products) {
      cart[product.id] = 0;
    }
    return cart;
  };

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8081/shop-context') 
      .then(response => {
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
        setCartItems(getDefaultCart(fetchedProducts));
        console.log(fetchedProducts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      }); 
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find(product => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      } 
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const addToCart = (itemID) => {
    setCartItems(prev => ({ ...prev, [itemID]: prev[itemID] + 1 }));
  };

  const removeFromCart = (itemID) => {
    setCartItems(prev => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemID) => {
    setCartItems(prev => ({ ...prev, [itemID]: newAmount }));
  };

  const contextValue = {
    cartItems,
    products,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
