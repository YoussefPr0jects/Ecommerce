import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { Product } from "./product";
import { Link } from 'react-router-dom';
import "./shop.css";
import '../home/home.css';
export const Shop = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>NOSSA Tech</h1>
      </div>

      <div className="products">
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
      <footer className="footer">
      <div className="container">
        <h2>Address</h2>
        <p>Lebanese American University, Blat street, Jbeil, Lebanon</p>
        <p>(+961) 12345678</p>
        <p>nosatech@gmail.com</p>
        <div className="social-icons">
          {}
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
        </div>
        <nav className="footer-nav">
        <Link to="/home">Home</Link>
        <Link to="/">Shop</Link>
          <a href="#">Contact us</a>
        </nav>
      </div>
    </footer>
    </div>
  );
};
 