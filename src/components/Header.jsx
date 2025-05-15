import { Link } from "react-router-dom";
import useCart from "../components/useCart";

// Import img.
import logo from "../assets/logo.png";
import cartIcon from "../assets/cart.png";
import adminIcon from "../assets/employee.png";

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="home-header">
      <div className="top-nav">
        {/* Admin button */}
        <div className="admin-button">
          <a href="/#/login"> {/* Use hash route for GitHub Pages */}
            <img src={adminIcon} alt="Admin" className="nav-icon" />
          </a>
        </div>

        {/* Cart button */}
        <div className="cart-button">
          <div className="cart-icon-wrapper">
            <Link to="/cart">
              <img src={cartIcon} alt="Cart" className="nav-icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Logo & title */}
      <div className="logo-title">
        <a href="/#/"> {/* Use hash route */}
          <img src={logo} alt="Sunny Play Logo" className="logo" />
        </a>
        <h1>Welcome to Sunny Play!</h1>
      </div>
    </header>
  );
};

export default Header;
