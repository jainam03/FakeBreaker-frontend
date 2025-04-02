import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Paper, Typography, Button, Box, LinearProgress, Divider,
    Container, Card, CardContent, useTheme, Grid, Tooltip,
    CircularProgress
} from "@mui/material";
import {
    CheckCircleOutline, WarningAmber, AudioFile,
    InfoOutlined, ArrowBack, Share
} from "@mui/icons-material";
import { motion } from "framer-motion";

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const { result, fileName } = location.state || {};

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
            return probability > 80 ? theme.palette.success.main :
                probability > 60 ? theme.palette.success.light :
                    theme.palette.warning.main;
        } else {
            return probability > 80 ? theme.palette.error.main :
                probability > 60 ? theme.palette.error.light :
                    theme.palette.warning.main;
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: { xs: 3, sm: 5 }, mb: 6 }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: "16px",
                            overflow: "hidden",
                            bgcolor: "background.paper"
                        }}
                    >
                        {/* Header */}
                        <Box
                            sx={{
                                py: 3,
                                px: 4,
                                background: theme.palette.mode === 'dark'
                                    ? "linear-gradient(120deg, #2c3e50 0%, #1e3c72 100%)"
                                    : "linear-gradient(120deg, #1976d2 0%, #64b5f6 100%)",
                                color: "white",
                                textAlign: "center"
                            }}
                        >
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Analysis Results
                            </Typography>
                            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                                Audio deepfake detection completed
                            </Typography>
                        </Box>

                        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                            {/* File Info */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    px: 2,
                                    py: 1.5,
                                    mb: 3,
                                    borderRadius: "8px",
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                }}
                            >
                                <AudioFile color="primary" sx={{ mr: 1.5 }} />
                                <Typography variant="body1" color="text.primary" sx={{ fontWeight: "medium" }}>
                                    {fileName}
                                </Typography>
                            </Box>

                            {/* Result Icon & Label */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    mb: 4
                                }}
                            >
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.4
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 120,
                                            height: 120,
                                            borderRadius: "50%",
                                            mb: 2,
                                            background: isReal
                                                ? theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(76, 175, 80, 0.1)'
                                                : theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.15)' : 'rgba(244, 67, 54, 0.1)',
                                            boxShadow: `0 0 15px ${isReal ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                                        }}
                                    >
                                        {isReal ? (
                                            <CheckCircleOutline
                                                sx={{
                                                    fontSize: 70,
                                                    color: theme.palette.success.main
                                                }}
                                            />
                                        ) : (
                                            <WarningAmber
                                                sx={{
                                                    fontSize: 70,
                                                    color: theme.palette.error.main
                                                }}
                                            />
                                        )}
                                    </Box>
                                </motion.div>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: "bold",
                                        color: isReal
                                            ? theme.palette.success.main
                                            : theme.palette.error.main
                                    }}
                                >
                                    {isReal ? "Authentic Audio" : "Deepfake Detected"}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ mt: 1, mb: 2 }}
                                >
                                    {isReal
                                        ? "This audio appears to be authentic human speech."
                                        : "This audio likely contains AI-generated content."}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 4 }} />

                            {/* Probability Metrics */}
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={6}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            height: "100%",
                                            borderColor: getProbabilityColor(result.real_probability, true),
                                            borderWidth: 2,
                                            bgcolor: theme.palette.mode === 'dark'
                                                ? 'rgba(76, 175, 80, 0.05)'
                                                : 'rgba(76, 175, 80, 0.02)'
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 2,
                                                color: theme.palette.mode === 'dark'
                                                    ? theme.palette.success.light
                                                    : theme.palette.success.dark
                                            }}
                                        >
                                            Real Probability
                                            <Tooltip title="Likelihood that this audio is authentic human speech">
                                                <InfoOutlined fontSize="small" sx={{ ml: 1, opacity: 0.7 }} />
                                            </Tooltip>
                                        </Typography>

                                        <Box sx={{ position: "relative", mb: 1 }}>
                                            <Box sx={{ position: "relative", display: "inline-flex" }}>
                                                <CircularProgress
                                                    variant="determinate"
                                                    value={result.real_probability}
                                                    size={80}
                                                    thickness={6}
                                                    sx={{
                                                        color: getProbabilityColor(result.real_probability, true),
                                                        '& .MuiCircularProgress-circle': {
                                                            strokeLinecap: 'round',
                                                        }
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        top: 0,
                                                        left: 0,
                                                        bottom: 0,
                                                        right: 0,
                                                        position: 'absolute',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        component="div"
                                                        color="text.primary"
                                                        fontWeight="bold"
                                                    >
                                                        {`${Math.round(result.real_probability)}%`}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 2 }}
                                        >
                                            Confidence: <Typography component="span" fontWeight="bold">
                                                {getConfidenceLevel(result.real_probability)}
                                            </Typography>
                                        </Typography>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            height: "100%",
                                            borderColor: getProbabilityColor(result.fake_probability, false),
                                            borderWidth: 2,
                                            bgcolor: theme.palette.mode === 'dark'
                                                ? 'rgba(244, 67, 54, 0.05)'
                                                : 'rgba(244, 67, 54, 0.02)'
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 2,
                                                color: theme.palette.mode === 'dark'
                                                    ? theme.palette.error.light
                                                    : theme.palette.error.dark
                                            }}
                                        >
                                            Fake Probability
                                            <Tooltip title="Likelihood that this audio is AI-generated">
                                                <InfoOutlined fontSize="small" sx={{ ml: 1, opacity: 0.7 }} />
                                            </Tooltip>
                                        </Typography>

                                        <Box sx={{ position: "relative", mb: 1 }}>
                                            <Box sx={{ position: "relative", display: "inline-flex" }}>
                                                <CircularProgress
                                                    variant="determinate"
                                                    value={result.fake_probability}
                                                    size={80}
                                                    thickness={6}
                                                    sx={{
                                                        color: getProbabilityColor(result.fake_probability, false),
                                                        '& .MuiCircularProgress-circle': {
                                                            strokeLinecap: 'round',
                                                        }
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        top: 0,
                                                        left: 0,
                                                        bottom: 0,
                                                        right: 0,
                                                        position: 'absolute',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        component="div"
                                                        color="text.primary"
                                                        fontWeight="bold"
                                                    >
                                                        {`${Math.round(result.fake_probability)}%`}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 2 }}
                                        >
                                            Confidence: <Typography component="span" fontWeight="bold">
                                                {getConfidenceLevel(result.fake_probability)}
                                            </Typography>
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 3 }, mt: 3, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBack />}
                                    onClick={() => navigate("/upload")}
                                    sx={{
                                        py: 1.2,
                                        px: 3,
                                        borderRadius: "30px",
                                        fontWeight: "bold",
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
                                    Analyze Another Audio
                                </Button>

                                <Button
                                    variant="outlined"
                                    startIcon={<Share />}
                                    sx={{
                                        py: 1.2,
                                        px: 3,
                                        borderRadius: "30px",
                                        borderWidth: 2,
                                        "&:hover": {
                                            borderWidth: 2
                                        }
                                    }}
                                    onClick={() => {
                                        // Simple share functionality
                                        if (navigator.share) {
                                            navigator.share({
                                                title: 'Audio Deepfake Detection Result',
                                                text: `Analysis result: ${result.result_label} (${Math.round(isReal ? result.real_probability : result.fake_probability)}% confidence)`
                                            })
                                        }
                                    }}
                                >
                                    Share Results
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Disclaimer Section */}
                <motion.div variants={itemVariants}>
                    <Paper
                        elevation={1}
                        sx={{
                            p: 3,
                            mt: 3,
                            borderRadius: "10px",
                            bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f9f9ff',
                            borderLeft: `4px solid ${theme.palette.info.main}`,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <InfoOutlined color="info" sx={{ mr: 1.5, mt: 0.2 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.primary" fontWeight="bold" gutterBottom>
                                    Important Information
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    The results generated by our detector provide a strong indication, but deepfake technology
                                    is continuously evolving. While our model achieves high accuracy, it may not be 100% accurate
                                    in all cases. Always verify critical audio from trusted sources.
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </motion.div>
            </motion.div>
        </Container>
    );
};

export default ResultsPage;
