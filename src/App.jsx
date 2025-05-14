import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import CartProvider from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <Header />
      <Outlet />
    </CartProvider>
  );
}

export default App;
