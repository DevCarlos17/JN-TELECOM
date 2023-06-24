import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import FinancialRecordsProvider from "./context/FinancialRecordsContext.jsx";
import { SalesProvider } from "./context/salesContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import ContactProvider from "./context/contactContext.jsx";
import "primereact/resources/themes/saga-blue/theme.css"; // Importa el tema de PrimeReact que desees usar
import "primereact/resources/primereact.min.css"; // Importa los estilos base de PrimeReact
import "primeicons/primeicons.css"; // Importa los estilos de PrimeIcons

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SalesProvider>
        <ContactProvider>
          <FinancialRecordsProvider>
            <App />
          </FinancialRecordsProvider>
        </ContactProvider>
      </SalesProvider>
    </UserProvider>
  </React.StrictMode>
);
