import { Link } from "react-router-dom"; // ✅ เพิ่มเพื่อใช้ <Link>
import useCart from "../components/useCart";

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="home-header">
      <div className="top-nav">
        {/* ปุ่มแอดมิน */}
        <div className="admin-button">
          <a href="/login">
            <img src="/images/employee.png" alt="Admin" className="nav-icon" />
          </a>
        </div>

        {/* ปุ่มตะกร้า */}
        <div className="cart-button">
          <div className="cart-icon-wrapper">
            <Link to="/cart">
              <img src="/images/cart.png" alt="Cart" className="nav-icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* โลโก้และข้อความ */}
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
