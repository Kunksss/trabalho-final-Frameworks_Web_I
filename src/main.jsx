import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import "./index.css";

// Tema com cores inspiradas no Pokémon (vermelho e azul)
const tema = createTheme({
  palette: {
    primary: { main: "#d32f2f" },
    secondary: { main: "#3b4cca" },
    background: { default: "#f5f5f5" },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={tema}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
