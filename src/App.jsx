// src/App.jsx
import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import ResultsPage from "./components/ResultsPage";
import LandingPage from "./components/LandingPage";
import LearnMore from "./components/LearnMore";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.toggle("dark", systemPrefersDark);
      localStorage.setItem("theme", systemPrefersDark ? "dark" : "light");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Router>
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/upload" element={<UploadForm />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
