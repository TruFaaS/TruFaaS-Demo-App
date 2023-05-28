import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      {/* <RouterProvider router={router} /> */}
    </ThemeProvider>
  </React.StrictMode>
);
