import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={80} color="#ccc" />
        <h2>Your Amazon Cart is empty</h2>
        <p>Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.</p>
        <Link to="/" className="continue-link">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-items-section">
        <h1>Shopping Cart</h1>
        <div className="cart-labels">
          <span>Price</span>
        </div>
        <hr />
        {cart.map((item) => (
          <div key={item.id} className="cart-page-item">
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="item-details">
              <Link to={`/product/${item.id}`} className="item-title">{item.title}</Link>
              <p className="stock-info">In Stock</p>
              <p className="shipping-info">Eligible for FREE Shipping</p>
              
              <div className="item-actions">
                <div className="qty-selector">
                  <button onClick={() => updateQty(item.id, "dec")}><Minus size={14} /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, "inc")}><Plus size={14} /></button>
                </div>
                <span className="separator">|</span>
                <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>Delete</button>
              </div>
            </div>
            <div className="item-price">
              ${item.price}
            </div>
          </div>
        ))}
        <div className="cart-subtotal">
          Subtotal ({cartCount} items): <strong>${cartTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div className="cart-checkout-section">
        <div className="checkout-card">
          <div className="free-shipping-note">
             <span>✓</span> Your order qualifies for FREE Shipping. Choose this option at checkout.
          </div>
          <h3>Subtotal ({cartCount} items): <strong>${cartTotal.toFixed(2)}</strong></h3>
          <div className="gift-checkbox">
            <input type="checkbox" id="gift" />
            <label htmlFor="gift">This order contains a gift</label>
          </div>
          <Link to="/checkout" className="proceed-btn">Proceed to checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
