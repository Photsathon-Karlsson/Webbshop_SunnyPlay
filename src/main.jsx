// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Import pages correctly
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";        // ใช้อันนี้ ✅
import Login from "./pages/Login.jsx";
import AdminEditor from "./pages/AdminEditor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/admin", element: <AdminEditor /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
