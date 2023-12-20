import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import Imagee from './two.jpeg'; 
import './home.css';
export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="main-layout">
            
        <div className="about">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-5 co-sm-l2">
                <div className="about_img">
                  <figure><img src={Imagee}  alt="img" /></figure>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 co-sm-l2">
                <div className="about_box">
                  <h1>About Us</h1>
                  <p>We’re a pair of engineering students with a passion for electronics. This led us to create our own online electronics store. We offer a wide range of products, from the latest smartphones and laptops to headphones and other electronic accessories. But we’re not just about selling electronics. We believe in educating our customers, helping them make informed decisions. As students, we understand the importance of staying updated with technological advancements, and we ensure our product offerings reflect this. We’re more than just a store; we’re a community of tech lovers. Join us on this exciting journey in the world of electronics.  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
      <div className="container">
        <h2>Address</h2>
        <p>Lebanese American University, Blat street, Jbeil, Lebanon</p>
        <p>(+961) 12345678</p>
        <p>nosatech@gmail.com</p>
        <div className="social-icons">
          {/* Replace '#' with your actual social media links */}
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

export default Home;
