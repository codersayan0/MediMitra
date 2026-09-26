import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "@/styles/global.css";
import "@/styles/layout.css";
import "@/styles/sections.css";
import "@/styles/placeholder.css";
import "@/styles/auth.css";
import "@/styles/doctor.css";
import "@/styles/role-selection.css";
import "@/styles/patient-dashboard.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);