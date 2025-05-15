// Create a custom hook that makes it easier to use the CartContext from other files, so don't have to call useContext directly every time.
// useCart makes it easy to use cart data in React by simplifying access to CartContext.
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Create a custom hook called useCart to access CartContext values. This avoids repeating useContext(CartContext) in every file.
const useCart = () => useContext(CartContext);

export default useCart; 

