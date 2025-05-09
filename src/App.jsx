import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <Outlet />
    </CartProvider>
  );
}

export default App;
