import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAudio } from "../api";
import { motion } from "framer-motion";
import { useDropzone } from 'react-dropzone';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an audio file to analyze.");
      return;
    }
    setError("");
    setLoading(true);
    setStatusMsg("Uploading your audio file...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const data = await uploadAudio(formData);
      setStatusMsg("Processing audio with AI...");
      if (!data || !data.label) {
        throw new Error("Unexpected response from server.");
      }
      setLoading(false);
      navigate("/results", { state: { result: data, fileName: file.name } });
    } catch (err) {
      setLoading(false);
      if(err.message.includes("Failed to fetch.")) {
      	setError("Server is unavailable or request timed out. Please try again later.")
      } else {
      	setError("Aww, snap! Unexpected error occured.")
      }
      console.error(err)
    }
  };

  const animationVariants = {
    container: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
          when: "beforeChildren",
          staggerChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-16 px-4">
      <motion.div
        variants={animationVariants.container}
        initial="hidden"
        animate="visible"
      >
        <div className="glass-card p-8 text-center">
            <motion.div variants={animationVariants.item}>
            <h2 className="text-3xl font-bold text-primary-500 dark:text-primary-400 mb-3">Upload Your Audio</h2>
            </motion.div>
            <motion.div variants={animationVariants.item}>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Upload an MP3 or WAV file to analyze for potential deepfake characteristics. Our AI model will process your audio and provide a detailed analysis.
            </p>
            </motion.div>
            <motion.div
              variants={animationVariants.item}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
            <div
                {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 my-4 cursor-pointer flex flex-col items-center justify-center min-h-[160px] transition-all duration-200 ${isDragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-700 bg-transparent'}`}
              >
                <input {...getInputProps()} />
              <svg className="w-12 h-12 text-primary-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-8m0 0l-4 4m4-4l4 4M4 20h16" />
              </svg>
              <div className="font-medium text-gray-800 dark:text-gray-100">
                  {isDragActive
                    ? "Drop your audio file here..."
                    : file
                      ? "File selected! Click or drag to replace."
                      : "Drag & drop your audio file here, or click to browse"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Supported formats: MP3, WAV
              </div>
                {!file && (
                <button
                  type="button"
                  className="btn-secondary mt-4"
                  >
                    Browse Files
                </button>
                )}
                {file && (
                <div className="mt-4 flex items-center justify-center p-2 rounded bg-gray-100 dark:bg-gray-800/60">
                  <span className="text-primary-500 font-medium text-sm truncate max-w-xs">
                      {file.name}
                  </span>
                  <button
                    type="button"
                    className="ml-3 text-red-500 hover:text-red-700 text-xs font-semibold"
                    onClick={e => { e.stopPropagation(); setFile(null); }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            </motion.div>
          {error && (
            <motion.div variants={animationVariants.item} className="mt-4">
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm">
                {error}
              </div>
            </motion.div>
          )}
          {statusMsg && loading && (
            <motion.div variants={animationVariants.item} className="mt-4">
              <div className="w-full max-w-md mx-auto">
                <div className="h-2 bg-blue-100 dark:bg-blue-800/30 rounded-full overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-blue-600 dark:bg-blue-400 animate-indeterminate-bar" style={{ width: '40%' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <motion.div variants={animationVariants.item} className="mt-8">
            <button
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Audio"}
            </button>
          </motion.div>
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold text-yellow-600 dark:text-yellow-400">Important:</span>{" "}
                The first analysis may take some time as our AI model initializes, but subsequent analyses will be faster.
                Please be patient during the initial processing.
              </p>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold text-red-600 dark:text-red-400">Disclaimer:</span>{" "}
                We don't save or store any of the audio files you upload. Your privacy is our priority.
                Feel free to perform as many analyses as you need.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadForm;
