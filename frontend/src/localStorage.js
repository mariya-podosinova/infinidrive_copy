const cartKey = "cart";

export const getCart = () => {
  const cartStr = localStorage.getItem(cartKey);
  if (!cartStr) return new Set();

  return new Set(JSON.parse(cartStr));
};

export const clearCart = () => localStorage.removeItem(cartKey);

export const saveCart = (newCart) => {
  let newCartStr;

  if (newCart && (newCartStr = JSON.stringify([...newCart.values()])))
    localStorage.setItem(cartKey, newCartStr);

  if (newCartStr) return newCart;
};

export const cartCount = () => getCart().size;
