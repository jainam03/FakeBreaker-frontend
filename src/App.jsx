// src/App.jsx
import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import UploadForm from "./components/UploadForm";
import ResultsPage from "./components/ResultsPage";
import LandingPage from "./components/LandingPage";
import LearnMore from "./components/LearnMore";
import Footer from "./components/Footer";
import {Analytics} from "@vercel/analytics/react"

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
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background shapes/blobs that will be consistent across all pages */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400/20 dark:bg-primary-500/20 rounded-full filter blur-3xl animate-gradient-xy -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-gradient-xy translate-x-1/3"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-400/20 dark:bg-pink-500/20 rounded-full filter blur-3xl animate-gradient-xy"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-yellow-300/20 dark:bg-yellow-400/20 rounded-full filter blur-3xl animate-gradient-xy"></div>
      </div>
      
      <Router>
        <NavBar />
        <main className="flex-grow relative z-10">
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
        <Analytics />
      </Router>
    </div>
  );
}

export default App;
