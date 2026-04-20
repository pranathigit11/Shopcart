import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.title} />
      </Link>
      
      <div className="product-card-info">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.round(product.rating.rate) ? "gold" : "none"} 
                color="gold" 
              />
            ))}
          </div>
          <span className="rating-count">{product.rating.count}</span>
        </div>

        <div className="product-price">
          <span className="currency">$</span>
          <span className="price">{product.price}</span>
        </div>

        <p className="delivery-info">Get it as soon as <strong>Tomorrow</strong></p>
        <p className="shipping-info">FREE Shipping by shopcart</p>

        <button className="add-btn" onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;