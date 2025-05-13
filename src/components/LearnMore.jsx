import React from 'react'
import { motion } from "framer-motion";

const LearnMore = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };
    
    return(
        <div className="max-w-4xl mx-auto px-4 py-12">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="glass-card noise-overlay p-8"
            >
                <motion.h1 
                    variants={itemVariants}
                    className="text-3xl font-bold text-center text-primary-500 mb-8"
                >
                    Coming Soon...
                </motion.h1>
                <motion.p 
                    variants={itemVariants}
                    className="text-gray-700 dark:text-gray-300 text-center"
                >
                    We're currently working on this page to provide comprehensive information about deepfake detection technology.
                </motion.p>
            </motion.div>
        </div>
    )
}

export default LearnMore