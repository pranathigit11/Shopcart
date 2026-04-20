import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(`Increased ${product.title} quantity`);
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      toast.success(`${product.title} added to cart`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        search,
        setSearch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
