// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Check username & password.
    if (username === "admin" && password === "1234") {
      navigate("/admin");
    } else {
      setError("Username or password is incorrect");
    }
  };

  return (
    <main className="main-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" // placeholder for text box
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" // placeholder for text box
          />
        </label>
        <button type="submit">Log in</button>
        {error && <p className="error-message">{error}</p>} {/* error message */}
      </form>
    </main>
  );
};

export default Login;
