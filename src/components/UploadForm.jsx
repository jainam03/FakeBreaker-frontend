import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { uploadAudio } from "../api";
import { Button, Typography, Paper, Box, Alert, Container, LinearProgress, Card, CardContent, CardActions, useTheme, Divider, Tooltip, IconButton } from "@mui/material";
import { UploadFile, Warning, NotificationAddOutlined, InfoOutlined, CloudUpload } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDropzone } from 'react-dropzone';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  // const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

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

      // Complete the analysis and navigate
      setLoading(false);
      navigate("/results", { state: { result: data, fileName: file.name } });
    } catch (err) {
      setLoading(false);
      setStatusMsg("");
      setError(err.message || "Failed to process audio. Please try again.");
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
    <Container maxWidth="md" sx={{ mt: { xs: 3, sm: 5 }, mb: 6 }}>
      <motion.div
        variants={animationVariants.container}
        initial="hidden"
        animate="visible"
      >
        <Card
          elevation={4}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: "16px",
            textAlign: "center",
            bgcolor: "background.paper",
            overflow: "hidden"
          }}
        >
          <CardContent>
            <motion.div variants={animationVariants.item}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                color="primary"
                sx={{ mb: 3, fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                Upload Your Audio
              </Typography>
            </motion.div>

            <motion.div variants={animationVariants.item}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "90%", mx: "auto" }}>
                Upload an MP3 or WAV file to analyze for potential deepfake characteristics.
                Our AI model will process your audio and provide a detailed analysis.
              </Typography>
            </motion.div>

            <motion.div
              variants={animationVariants.item}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Box
                {...getRootProps()}
                sx={{
                  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '10px',
                  p: 4,
                  my: 2,
                  cursor: 'pointer',
                  bgcolor: isDragActive ? (theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)') : 'transparent',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '160px'
                }}
              >
                <input {...getInputProps()} />
                <CloudUpload fontSize="large" color="primary" sx={{ mb: 2, fontSize: '3rem' }} />

                <Typography variant="body1" color="text.primary" fontWeight="medium">
                  {isDragActive
                    ? "Drop your audio file here..."
                    : file
                      ? "File selected! Click or drag to replace."
                      : "Drag & drop your audio file here, or click to browse"}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Supported formats: MP3, WAV
                </Typography>

                {!file && (
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadFile />}
                    sx={{ mt: 2, borderRadius: "30px" }}
                  >
                    Browse Files
                  </Button>
                )}

                {file && (
                  <Box sx={{
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    borderRadius: '8px',
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                  }}>
                    <Typography variant="body2" color="primary" fontWeight="medium">
                      {file.name}
                    </Typography>
                    <Tooltip title="File selected">
                      <IconButton size="small" color="success" sx={{ ml: 1 }}>
                        <InfoOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            </motion.div>
          </CardContent>

          <Divider sx={{ my: 1, mx: { xs: 1, sm: 3 } }} />

          <CardActions sx={{ justifyContent: "center", p: 3 }}>
            <motion.div
              variants={animationVariants.item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleUpload}
                disabled={loading}
                sx={{
                  py: 1.2,
                  px: 4,
                  borderRadius: "30px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  background: theme.palette.mode === 'dark'
                    ? "linear-gradient(90deg, #2196F3 0%, #64B5F6 100%)"
                    : "linear-gradient(90deg, #1976D2 0%, #42A5F5 100%)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    background: theme.palette.mode === 'dark'
                      ? "linear-gradient(90deg, #1E88E5 0%, #2196F3 100%)"
                      : "linear-gradient(90deg, #1565C0 0%, #1976D2 100%)",
                  }
                }}
              >
                {loading ? "Processing..." : "Analyze Audio"}
              </Button>
            </motion.div>
          </CardActions>

          {loading && (
            <motion.div
              variants={animationVariants.item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Box sx={{ px: 3, pb: 3 }}>
                <Typography variant="body2" color="text.secondary" fontWeight="medium" mb={1.5}>
                  {statusMsg}
                </Typography>
                <LinearProgress
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': {
                      backgroundImage: 'linear-gradient(90deg, #1976D2, #42A5F5)'
                    }
                  }}
                />
              </Box>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity="error"
                sx={{
                  mt: 2,
                  mx: 3,
                  borderRadius: "8px",
                  '& .MuiAlert-icon': {
                    fontSize: '1.2rem'
                  }
                }}
              >
                {error}
              </Alert>
            </motion.div>
          )}
        </Card>
      </motion.div>

      <motion.div
        variants={animationVariants.item}
        transition={{ delay: 0.2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem",
            flexDirection: "column",
            gap: 2,
            mt: 4
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : '#f8f9fb',
              borderRadius: "10px",
              width: "100%",
              borderLeft: `4px solid ${theme.palette.warning.main}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <NotificationAddOutlined color="warning" sx={{ mr: 1.5, mt: 0.2 }} />
              <Typography variant="body2" color="text.primary" fontWeight="medium">
                <Typography component="span" fontWeight="bold" color="warning.main">
                  Important:
                </Typography>{" "}
                The first analysis may take some time as our AI model initializes, but subsequent analyses will be faster.
                Please be patient during the initial processing.
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(229, 115, 115, 0.08)' : '#fff8f8',
              borderRadius: "10px",
              width: "100%",
              borderLeft: `4px solid ${theme.palette.error.main}`
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Warning color="error" sx={{ mr: 1.5, mt: 0.2 }} />
              <Typography variant="body2" color="text.primary" fontWeight="medium">
                <Typography component="span" fontWeight="bold" color="error.main">
                  Disclaimer:
                </Typography>{" "}
                We don't save or store any of the audio files you upload. Your privacy is our priority.
                Feel free to perform as many analyses as you need.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default UploadForm;
