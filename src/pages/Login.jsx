// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // fake login logic (replace with Firebase Auth later)
    navigate("/admin");
  };

  return (
    <main>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" />
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
    </main>
  );
};

export default Login;