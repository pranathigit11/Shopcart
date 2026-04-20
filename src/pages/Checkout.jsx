import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Lock } from "lucide-react";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>No items to checkout</h2>
        <Link to="/" className="continue-link">Go back to shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <header className="checkout-header">
         <h1>Checkout</h1>
         <Lock size={16} /> Secure checkout
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section>
            <h3>1. Shipping Address</h3>
            <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                    type="text" 
                    placeholder="Address" 
                    required 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                <div className="input-row">
                    <input 
                        type="text" 
                        placeholder="City" 
                        required 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Zip Code" 
                        required 
                        value={formData.zip}
                        onChange={(e) => setFormData({...formData, zip: e.target.value})}
                    />
                </div>
            </div>
          </section>

          <section>
            <h3>2. Payment Method</h3>
            <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Card Number (Placeholder)" 
                    required 
                    value={formData.card}
                    onChange={(e) => setFormData({...formData, card: e.target.value})}
                />
            </div>
          </section>

          <section>
            <h3>3. Review Items</h3>
            <div className="checkout-items">
                {cart.map(item => (
                    <div key={item.id} className="checkout-item">
                        <img src={item.image} alt={item.title} />
                        <span>{item.qty}x {item.title}</span>
                    </div>
                ))}
            </div>
          </section>

          <button type="submit" className="place-order-btn">Place your order</button>
        </form>

        <div className="checkout-summary">
            <div className="summary-card">
                <button type="submit" onClick={handleSubmit} className="place-order-btn">Place your order</button>
                <p className="terms">By placing your order, you agree to our privacy notice and conditions of use.</p>
                <hr />
                <h4>Order Summary</h4>
                <div className="summary-row">
                    <span>Items:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                </div>
                <hr />
                <div className="summary-row total">
                    <span>Order Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
