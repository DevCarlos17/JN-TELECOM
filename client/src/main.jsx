import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import FinancialRecordsProvider from "./context/FinancialRecordsContext.jsx";
import { SalesProvider } from "./context/salesContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import ContactProvider from "./context/contactContext.jsx";
import VerticalGrowthProvider from "./context/verticalGrowthContext.jsx";
import ScheduledContactProvider from "./context/scheduledContactContext.jsx";
import StreamingProvider from "./context/stramingContext.jsx";
import "primereact/resources/themes/saga-blue/theme.css"; // Importa el tema de PrimeReact que desees usar
import "primereact/resources/primereact.min.css"; // Importa los estilos base de PrimeReact
import "primeicons/primeicons.css"; // Importa los estilos de PrimeIcons
import "@fontsource-variable/onest";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SalesProvider>
        <ContactProvider>
          <FinancialRecordsProvider>
            <VerticalGrowthProvider>
              <ScheduledContactProvider>
                <StreamingProvider>
                  <App />
                </StreamingProvider>
              </ScheduledContactProvider>
            </VerticalGrowthProvider>
          </FinancialRecordsProvider>
        </ContactProvider>
      </SalesProvider>
    </UserProvider>
  </React.StrictMode>
);
