// Create a custom hook that makes it easier to use the CartContext from other files, so don't have to call useContext directly every time.

import { useContext } from "react";
import { CartContext } from "./CartContext";

export const useCart = () => useContext(CartContext);
