import { Link } from "react-router-dom"; 
import useCart from "../components/useCart";

const Header = () => {
  const { cartItems } = useCart();
  const basePath = import.meta.env.BASE_URL;

  return (
    <header className="home-header">
      <div className="top-nav">
        {/* Admin button */}
        <div className="admin-button">
          <a href="/login">
            <img src={`${basePath}src/assets/employee.png`} alt="Admin" className="nav-icon" />
          </a>
        </div>

        {/* Cart button */}
        <div className="cart-button">
          <div className="cart-icon-wrapper">
            <Link to="/cart">
              <img src={`${basePath}src/assets/cart.png`} alt="Cart" className="nav-icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Logo & title */}
      <div className="logo-title">
        <a href="/">
          <img src={`${basePath}src/assets/logo.png`} alt="Sunny Play Logo" className="logo" />
        </a>
        <h1>Welcome to Sunny Play !</h1>
      </div>
    </header>
  );
};

export default Header;
