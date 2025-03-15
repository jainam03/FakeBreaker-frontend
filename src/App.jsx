// src/App.jsx
import React, { useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import ResultsPage from "./components/ResultsPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Navigate to="/upload" replace/>} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
