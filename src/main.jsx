import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PrimeReactProvider } from "@primereact/core";
import Lara from "@primeuix/themes/lara";
import "./index.css";
import "primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import "./i18n.js";

const primereact = {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider {...primereact}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
);
