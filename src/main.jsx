import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Use only global CSS.
import "./index.css";

import App from "./App.jsx";

// Import pages.
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import AdminEditor from "./pages/AdminEditor.jsx";

// Create Router.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "admin", element: <AdminEditor /> },
    ],
  },
]);

// Render app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
