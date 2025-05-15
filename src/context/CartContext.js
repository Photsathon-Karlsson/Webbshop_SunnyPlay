// This CartContext.js file (in src/context/) creates a React Context to manage cart data across the app.
// Use <CartContext.Provider> to share cart data, and useContext(CartContext) to get it.
import { createContext } from "react";

export const CartContext = createContext();
