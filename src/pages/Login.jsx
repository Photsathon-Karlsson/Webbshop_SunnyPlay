// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Declare a component function Login.
const Login = () => {
  const navigate = useNavigate(); // To navigate to another page after login success.
  const [username, setUsername] = useState(""); // Stores the username entered by the user.
  const [password, setPassword] = useState(""); // Stores user-entered passwords.
  const [error, setError] = useState(""); // Save error messages.

  // The handleLogin function is called when the user presses the login button.
  // e.preventDefault() stops the page from reloading on form submit.
  const handleLogin = (e) => {
    e.preventDefault();

    // Check username & password.
    // This code checks if the entered username and password match the set values.
    // If not matched, setError() shows "Username or password is incorrect.
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
