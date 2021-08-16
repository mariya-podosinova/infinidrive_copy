import { useState } from "react";
import { getCart, saveCart, clearCart } from "./localStorage";

const useCart = () => {
  const [didChange, setDidChange] = useState(false);
  const cart = getCart();

  const addToCart = (id) => {
    const newCart = cart.add(id);
    saveCart(newCart);
    setDidChange(!didChange);
  };

  const removeFromCart = (id) => {
    cart.delete(id);
    saveCart(cart);
    setDidChange(!didChange);
  };

  const clearOutCart = () => {
    clearCart();
    setDidChange(!didChange);
  };

  return {
    addToCart,
    clearCart: clearOutCart,
    removeFromCart,
    cart,
    isAdded: (id) => {
      return getCart().has(id.toString());
    },
  };
};

export default useCart;
