import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './order_confirmed.css';
export const OrderConfirmed = () => {
  const { orderId } = useParams();
  const [timer, setTimer] = useState(30); // Initial timer value in seconds

  useEffect(() => {
    // Decrease the timer every second
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Redirect to the home page after 30 seconds
    const redirectTimer = setTimeout(() => {
      window.location.reload();
      window.location.replace('/home');
    }, 30000);

    // Clear the intervals when the component unmounts
    return () => {
      clearInterval(countdown);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div>

<div class="card5"> 
 
  <div class="header"> 
    <div class="image">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </div> 
      <div class="content">
         <span class="title">Order validated</span> 
         <p class="message">Thank you for your purchase. Your package will be delivered within 2-5 working days of your purchase</p> 
      
      <p>Your Order ID: {orderId}</p>
      <p>For any inquiries, please refer to your Order ID and contact our customer support at:</p>
      <p>WhatsApp: +961 12 34 56 78</p>
      <p>You will be redirected in {timer} seconds.</p>
  
         </div> 
         
            </div> 
            </div> 
            </div>

 

      
  );
};

export default OrderConfirmed;
