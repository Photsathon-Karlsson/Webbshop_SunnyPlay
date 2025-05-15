import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

// CartProvider is a component that wraps and provides cart data to its child components. (It gives cart info to the components inside it.)
const CartProvider = ({ children }) => {
  // Use useState to store basket data.
  const [cartItems, setCartItems] = useState(() => { // cartItems = state that stores the items in the cart.
    const savedCart = localStorage.getItem("cartItems"); // Use localStorage to get saved data and convert it to an array with JSON.parse().
    return savedCart ? JSON.parse(savedCart) : []; // If there is no data, it will start from the empty array [].
  });
  // Use useEffect to save data to localStorage every time cartItems change.
  // Every time cartItems changes, the value in localStorage is updated, converted to a JSON string.
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart function : Adds an item to the cartItems array.
  // Function to remove products from the cart based on index.
  // Use splice() to delete items at specified positions.
  const addToCart = (item) => setCartItems((prev) => [...prev, item]);
  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const clearCart = () => setCartItems([]); // Set cartItems to an empty array.

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
