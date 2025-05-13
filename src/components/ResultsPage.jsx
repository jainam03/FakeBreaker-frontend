import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { captureElementScreenshot, shareScreenshot, downloadCanvasAsImage } from "../utils/screenshotUtils";

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { result, fileName } = location.state || {};
    const resultsCardRef = useRef(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    // If no result data exists, redirect back to upload page
    if (!result) {
        navigate("/");
        return null;
    }

    // Debug logging to see what we're getting from the server
    console.log('Result from server:', result);
    console.log('Result label:', result.result_label);
    console.log('Real probability:', result.real_probability);
    console.log('Fake probability:', result.fake_probability);

    // Determine if the audio is real based on probabilities instead of label
    const isReal = result.real_probability > result.fake_probability;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Calculate confidence level text
    const getConfidenceLevel = (probability) => {
        if (probability > 90) return "Very High";
        if (probability > 75) return "High";
        if (probability > 60) return "Moderate";
        if (probability > 40) return "Low";
        return "Very Low";
    };

    // Get color for probability
    const getProbabilityColor = (probability, isGood) => {
        if (isGood) {
            return probability > 80 ? "text-green-500" :
                probability > 60 ? "text-green-400" :
                    "text-yellow-500";
        } else {
            return probability > 80 ? "text-red-500" :
                probability > 60 ? "text-red-400" :
                    "text-yellow-500";
        }
    };

    // Close snackbar
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Handle share functionality with screenshot
    const handleShare = async () => {
        try {
            // Show loading message while processing
            setSnackbar({ open: true, message: "Preparing screenshot...", severity: "info" });
            
            // Use html2canvas via our utility to capture the results card DOM element
            const canvas = await captureElementScreenshot(resultsCardRef, {
                backgroundColor: "white"
            });
            
            // Prepare share data for Web Share API
            const shareData = {
                title: 'Audio Deepfake Detection Result',
                text: `Analysis result: ${isReal ? "Authentic Audio" : "Deepfake Detected"} (${Math.round(isReal ? result.real_probability : result.fake_probability)}% confidence)`,
            };
            
            // Try to share the screenshot using Web Share API
            // This returns true if sharing was successful, false otherwise
            const shared = await shareScreenshot(canvas, shareData);
            
            // If sharing failed (unsupported browser or user canceled)
            if (!shared) {
                // Fall back to downloading the image
                downloadCanvasAsImage(canvas, 'audioanalysis-result.png');
                setSnackbar({ 
                    open: true, 
                    message: "Sharing not supported on this device. Image downloaded instead.", 
                    severity: "info" 
                });
            }
        } catch (error) {
            console.error("Error sharing results:", error);
            setSnackbar({ 
                open: true, 
                message: "Couldn't capture screenshot. Please try again later.", 
                severity: "error" 
            });
        }
    };

    // Handle download functionality
    const handleDownload = async () => {
        try {
            setSnackbar({ open: true, message: "Preparing download...", severity: "info" });
            
            const canvas = await captureElementScreenshot(resultsCardRef, {
                backgroundColor: "white"
            });
            
            downloadCanvasAsImage(canvas, 'audioanalysis-result.png');
            
            setSnackbar({ 
                open: true, 
                message: "Image downloaded successfully!", 
                severity: "success" 
            });
        } catch (error) {
            console.error("Error downloading screenshot:", error);
            setSnackbar({ 
                open: true, 
                message: "Couldn't download screenshot. Please try again later.", 
                severity: "error" 
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 mb-16 px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <div className="glass-card noise-overlay overflow-hidden">
                        {/* Header */}
                        <div className="py-6 px-6 bg-gradient-to-r from-primary-600 to-primary-400 text-white text-center">
                            <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
                            <p className="opacity-90">Audio deepfake detection completed</p>
                        </div>

                        <div className="p-6">
                            {/* This div will be captured for screenshots */}
                            <div 
                                ref={resultsCardRef}
                                className="p-4 rounded-lg relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                        <span className="font-medium">{fileName}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleShare}
                                            className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
                                            aria-label="Share results"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="p-2 text-gray-600 hover:text-primary-500 transition-colors"
                                            aria-label="Download results"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-lg font-semibold">Result</span>
                                        <span className={`text-lg font-bold ${isReal ? 'text-green-500' : 'text-red-500'}`}>
                                            {isReal ? "Authentic Audio" : "Deepfake Detected"}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div 
                                            className={`h-2 rounded-full ${isReal ? 'bg-green-500' : 'bg-red-500'}`}
                                            style={{ width: `${Math.round(isReal ? result.real_probability : result.fake_probability)}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-600">
                                        Confidence: {getConfidenceLevel(Math.round(isReal ? result.real_probability : result.fake_probability))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 bg-gray-50/70 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20">
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Real Probability</div>
                                        <div className={`text-2xl font-bold ${getProbabilityColor(result.real_probability, true)}`}>
                                            {Math.round(result.real_probability)}%
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50/70 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/20">
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fake Probability</div>
                                        <div className={`text-2xl font-bold ${getProbabilityColor(result.fake_probability, false)}`}>
                                            {Math.round(result.fake_probability)}%
                                        </div>
                                    </div>
                                </div>

                                {/* Important Information Warning */}
                                <div className="p-4 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-lg border border-blue-200/30 dark:border-blue-800/30 mb-6">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                                                Important Information
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                The results generated by our detector provide a strong indication, but deepfake technology
                                                is continuously evolving. While our model achieves high accuracy, it may not be 100% accurate
                                                in all cases. Always verify critical audio from trusted sources.
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                    onClick={() => navigate("/upload")}
                                        className="btn-secondary"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Upload
                                    </button>
                                    <button
                                    onClick={handleShare}
                                        className="btn-primary"
                                >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                    Share Results
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Snackbar */}
            {snackbar.open && (
                <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-sm">
                    <div className={`text-sm ${snackbar.severity === 'error' ? 'text-red-600' : 'text-blue-600'}`}>
                        {snackbar.message}
                    </div>
                    <button
                        onClick={handleCloseSnackbar}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;
