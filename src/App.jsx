// src/App.jsx
import React, { useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Changed to HashRouter
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import ResultsPage from "./components/ResultsPage";
import LandingPage from "./components/LandingPage";
import LearnMore from "./components/LearnMore";

function App() {
  const [darkMode, setDarkMode] = useState(true);

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
      <Router> {/* Now HashRouter */}
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          {/* Redirect from the root to the landing page */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          {/* Route for the Landing Page */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="learn-more" element={<LearnMore />}  />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
