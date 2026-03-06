import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import People from "./pages/People";
import Skills from "./pages/Skills";

function App() {
  const [mode, setMode] = React.useState(() => {
    try {
      return localStorage.getItem("themeMode") || "light";
    } catch (e) {
      return "light";
    }
  });

  const toggleMode = React.useCallback(() => {
    setMode((m) => {
      const next = m === "light" ? "dark" : "light";
      try {
        localStorage.setItem("themeMode", next);
      } catch (e) {}
      return next;
    });
  }, []);

  const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navigation mode={mode} toggleTheme={toggleMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pessoas" element={<People />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
