import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Cargar carrito desde localStorage al iniciar
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prevCart, { ...product, precio: Number(product.precio) || 0, quantity: 1 }];
    });
  };

  // ✅ Remover producto del carrito
  const removeFromCart = (_id) => {
    setCart((prevCart) => prevCart.filter((p) => p._id !== _id));
  };

  // ✅ Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // ✅ Actualizar cantidad del producto en el carrito
  const updateQuantity = (_id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p._id === _id ? { ...p, quantity: Math.max(newQuantity, 1) } : p
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
