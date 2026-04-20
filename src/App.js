import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

// Pages
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Toaster position="bottom-right" reverseOrder={false} />
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;