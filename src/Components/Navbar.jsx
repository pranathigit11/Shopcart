import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Search, ShoppingCart, MapPin, Menu } from "lucide-react";

const Navbar = () => {
  const { cartCount, search, setSearch } = useCart();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-top">
        <Link to="/" className="nav-logo">
          <span className="logo-text">shopcart</span>
          <span className="logo-dot">.</span>
        </Link>

        <div className="nav-delivery">
          <MapPin size={18} className="nav-icon" />
          <div className="nav-text">
            <span className="nav-line-1">Deliver to</span>
            <span className="nav-line-2">India</span>
          </div>
        </div>

        <div className="nav-search">
          <select className="search-select">
            <option>All</option>
          </select>
          <input
            type="text"
            placeholder="Search shopcart"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="search-btn">
            <Search size={20} />
          </button>
        </div>

        <div className="nav-links">
          <div className="nav-item">
            <span className="nav-line-1">Hello, sign in</span>
            <span className="nav-line-2">Account & Lists</span>
          </div>

          <div className="nav-item">
            <span className="nav-line-1">Returns</span>
            <span className="nav-line-2">& Orders</span>
          </div>

          <Link to="/cart" className="nav-cart">
            <div className="cart-count-wrapper">
              <span className="cart-count">{cartCount}</span>
              <ShoppingCart size={32} />
            </div>
            <span className="nav-line-2">Cart</span>
          </Link>
        </div>
      </div>

      <div className="nav-bottom">
        <Menu size={20} />
        <span>All</span>
        <span>Today's Deals</span>
        <span>Customer Service</span>
        <span>Registry</span>
        <span>Gift Cards</span>
        <span>Sell</span>
      </div>
    </nav>
  );
};

export default Navbar;