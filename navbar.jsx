import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { useUser } from './UserContext';
import './navbar.css';
import NavbarImage from './three.jpeg';
export const Navbar = () => {
  const { userName } = useUser();

  return (
    <div className="navbar" style={{ backgroundImage: `url(${NavbarImage})`}}>
      <div className="link-left">
        {userName ? (
          <span style={{ fontSize: '1.3em', color: 'white' }}> Welcome, {userName}</span>
        ) : (
        <Link to="/login">
          <button className="button">
          Login
          </button>
          </Link>
        )}
      </div>
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/">Shop</Link>
  
        <Link to="/cart">
          <ShoppingCart size={35} />
        </Link>
      </div>
    </div>
  );
};
