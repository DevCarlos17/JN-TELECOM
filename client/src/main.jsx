import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SalesProvider } from "./context/salesContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import "primereact/resources/themes/saga-blue/theme.css"; // Importa el tema de PrimeReact que desees usar
import "primereact/resources/primereact.min.css"; // Importa los estilos base de PrimeReact
import "primeicons/primeicons.css"; // Importa los estilos de PrimeIcons

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
