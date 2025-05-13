import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
    { 
        title: "Upload", 
        description: "Upload an MP3/WAV file for analysis.", 
        icon: (
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
        )
    },
    { 
        title: "Analysis", 
        description: "Our model processes the audio file.", 
        icon: (
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
        )
    },
    { 
        title: "Results", 
        description: "View the deepfake probability score.", 
        icon: (
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
];

const faqs = [
    {
        question: "How accurate is the deepfake detection?",
        answer: "Our model achieves over 90% accuracy on benchmark datasets. However, as deepfake technology evolves, we continuously improve our detection algorithms."
    },
    {
        question: "What audio formats are supported?",
        answer: "Currently, we support MP3 and WAV file formats. We're working on expanding to additional audio formats in future updates."
    },
    {
        question: "Is my audio data kept private?",
        answer: "Yes, privacy is our priority. Your uploaded audio files are processed securely and are not stored permanently on our servers after analysis."
    },
    {
        question: "How does the detection technology work?",
        answer: "Our uses advanced deep learning techniques to analyze acoustic patterns, voice characteristics, and other subtle features that distinguish real from synthetic audio."
    }
];

const LandingPage = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            {/* Background shapes/blobs */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400/20 dark:bg-primary-500/20 rounded-full filter blur-3xl animate-gradient-xy -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-gradient-xy translate-x-1/3"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-400/20 dark:bg-pink-500/20 rounded-full filter blur-3xl animate-gradient-xy"></div>
                <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-yellow-300/20 dark:bg-yellow-400/20 rounded-full filter blur-3xl animate-gradient-xy"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* Hero Section */}
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                    >
                        Welcome to{" "}
                        <span className="text-primary-500 dark:text-primary-400">
                            fAKE BREAKer
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                    >
                        Your trusted tool for detecting and analyzing fake news and misinformation.
                        Get started by uploading content for analysis.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link
                            to="/upload"
                            className="btn-primary text-center"
                        >
                            Start Analysis
                        </Link>
                        <Link
                            to="/learn-more"
                            className="btn-secondary text-center"
                        >
                            Learn More
                        </Link>
                    </motion.div>
                </div>

                {/* How It Works Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                                className="glass-card noise-overlay p-6 text-center"
                            >
                                <div className="flex justify-center mb-4">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            {/* FAQ Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                            <motion.div
                        key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="glass-card noise-overlay overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                                >
                                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                                {faq.question}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 transform transition-transform duration-200 ${
                                            expandedFaq === index ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className={`px-6 transition-all duration-200 ${
                                        expandedFaq === index ? 'max-h-96 pb-4' : 'max-h-0'
                                    }`}
                                >
                                    <p className="text-gray-600 dark:text-gray-300">
                                {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const features = [
    {
        title: "Advanced Analysis",
        description: "Cutting-edge technology to detect and analyze potential fake media.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        title: "Real-time Results",
        description: "Get instant analysis results with detailed breakdowns and explanations.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        title: "User-Friendly",
        description: "Simple and intuitive interface designed for both beginners and experts.",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
];

export default LandingPage;

