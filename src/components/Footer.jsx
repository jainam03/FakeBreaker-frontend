import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="glass-navbar mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors duration-200">
                            fAKE BREAKer
                        </Link>
                        <span className="text-gray-500 dark:text-gray-400">|</span>
                        <Link to="/learn-more" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200">
                            Learn More
                        </Link>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} fAKE BREAKer. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;