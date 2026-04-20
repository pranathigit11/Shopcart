import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="back-to-top" onClick={scrollToTop}>
        Back to top
      </div>
      
      <div className="footer-links">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Shopcart</li>
            <li>Sustainability</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li>Sell products on Shopcart</li>
            <li>Sell on Shopcart Business</li>
            <li>Sell apps on Shopcart</li>
            <li>Become an Affiliate</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Shopcart Payment Products</h3>
          <ul>
            <li>Shopcart Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Shopcart Currency Converter</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li>Shopcart and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logo">
           <span>shopcart</span>
        </div>
        <div className="footer-legal">
            <span>Conditions of Use</span>
            <span>Privacy Notice</span>
            <span>Your Ads Privacy Choices</span>
            <span>© 2026 Shopcart.com, Inc. or its affiliates</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
