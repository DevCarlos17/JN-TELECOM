import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SalesProvider } from "./context/salesContext.jsx";
import { UserProvider } from "./context/userContext.jsx";

const REACT_APP_AUTH0_DOMAIN = "dev-ohruejs0n25qxewz.us.auth0.com";
const REACT_APP_AUTH0_CLIENT_ID = "Y3cYajklvuOq9u3QU00hEANWQg9wJRK2";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SalesProvider>
        <App />
      </SalesProvider>
    </UserProvider>
  </React.StrictMode>
);
