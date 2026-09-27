import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import "primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import "./i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
);
