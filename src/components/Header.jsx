import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";

// Import images
import logo from "../assets/logo.png";
import cartIcon from "../assets/cart.png";
import adminIcon from "../assets/employee.png";

const Header = () => {
  // Select only what you need to display total item count
  const totalItems = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="home-header">
      <div className="top-nav">
        {/* Admin button */}
        <div className="admin-button">
          <a href="/#/login">
            <img src={adminIcon} alt="Admin" className="nav-icon" />
          </a>
        </div>

        {/* Cart button */}
        <div className="cart-button">
          <div className="cart-icon-wrapper">
            <Link to="/cart">
              <img src={cartIcon} alt="Cart" className="nav-icon" />
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Logo & title */}
      <div className="logo-title">
        <a href="/#/">
          <img src={logo} alt="Sunny Play Logo" className="logo" />
        </a>
        <h1>Welcome to Sunny Play!</h1>
      </div>
    </header>
  );
};

export default Header;
