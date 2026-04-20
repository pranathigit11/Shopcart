import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../Components/ProductCard";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        fetch(`https://fakestoreapi.com/products/category/${data.category}`)
          .then((res) => res.json())
          .then((items) => {
            setRelated(items.filter((i) => i.id !== parseInt(id)).slice(0, 4));
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) return <div className="loader">Loading Product...</div>;

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back to Results
      </button>

      <div className="product-detail-main">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="category">{product.category}</p>
          
          <div className="rating">
            <div className="stars">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={16} fill={i < Math.round(product.rating.rate) ? "gold" : "none"} color="gold" />
               ))}
            </div>
            <span>({product.rating.count} reviews)</span>
          </div>

          <div className="price-tag">
            <span className="currency">$</span>
            <span className="price">{product.price}</span>
          </div>

          <div className="description">
            <h3>About this item</h3>
            <p>{product.description}</p>
          </div>

          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </div>
      </div>

      <div className="related-products">
        <h2>Customers also viewed</h2>
        <div className="products-grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
