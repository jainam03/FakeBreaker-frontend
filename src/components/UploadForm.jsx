import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAudio } from "../api";
import {
    Button,
    Typography,
    Paper,
    Box,
    Alert,
    Container,
    LinearProgress,
    Card,
    CardContent,
    CardActions
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { motion } from "framer-motion";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const navigate = useNavigate();
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a file.");
            return;
        }

        setError("");
        setLoading(true);
        setStatusMsg("Uploading file...");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const data = await uploadAudio(formData);
            setStatusMsg("Processing audio...");
            setLoading(false);

            if (!data || !data.label) {
                throw new Error("Unexpected response from server.");
            }

            navigate("/results", { state: { result: data, fileName: file.name } });
        } catch (err) {
            setLoading(false);
            setStatusMsg("");
            setError(err.message || "Failed to process audio.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Card elevation={4} sx={{ p: 3, borderRadius: "15px", textAlign: "center" }}>
                    <CardContent>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            gutterBottom
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Upload Your Audio
                        </Typography>
                        <Box mt={2}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Button variant="outlined" component="label" startIcon={<UploadFile />}>
                                    Choose File
                                    <input type="file" hidden onChange={handleFileChange} accept=".mp3, .wav" />
                                </Button>
                            </motion.div>
                            {file && (
                                <Typography variant="subtitle1" color="textSecondary" mt={1}>
                                    {file.name}
                                </Typography>
                            )}
                        </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleUpload}
                                disabled={loading}
                            >
                                Upload & Analyze
                            </Button>
                        </motion.div>
                    </CardActions>
                    {loading && (
                        <Box mt={2}>
                            <Typography variant="body2">{statusMsg}</Typography>
                            <Box mt={2} >
                            <LinearProgress />

                            </Box>
                        </Box>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Card>
            </motion.div>
        </Container>
    );
};

export default UploadForm;
