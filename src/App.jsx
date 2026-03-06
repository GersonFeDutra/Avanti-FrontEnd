import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import People from "./pages/People";
import Skills from "./pages/Skills";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pessoas" element={<People />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
