import "./Header.css";
import { useCart } from "../context/useCart";

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="home-header">
      <div className="top-nav">
        <div className="admin-button">
          <a href="/login">
            <img src="/images/employee.png" alt="Admin" className="nav-icon" />
          </a>
        </div>
        <div className="cart-button">
          <a href="/cart" className="cart-link">
            <img src="/images/cart.png" alt="Cart" className="nav-icon" />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </a>
        </div>
      </div>
      <div className="logo-title">
        <a href="/">
          <img src="/images/logo.png" alt="Sunny Play Logo" className="logo" />
        </a>
        <h1>Welcome to Sunny Play !</h1>
      </div>
    </header>
  );
};

export default Header;
