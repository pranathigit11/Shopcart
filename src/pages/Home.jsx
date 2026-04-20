import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import Hero from "../Components/Hero";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const { search } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="loader">Loading Products...</div>;

  return (
    <div className="home-container">
      <Hero />
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
