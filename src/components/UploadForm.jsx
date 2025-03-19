import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAudio } from "../api";
import {
    Button,
    Typography,
    Paper,
    Box,
    CircularProgress,
    Alert,
    Container,
    LinearProgress
} from "@mui/material";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const navigate = useNavigate();

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
            // Call uploadAudio helper, which should use your backend route
            const data = await uploadAudio(formData);
            setStatusMsg("Processing audio...");

            // Simulate a brief delay to allow the user to see the status update
            // (Remove this if not needed, or update dynamically if backend returns progress data.)
            await new Promise((resolve) => setTimeout(resolve, 500));

            setLoading(false);

            if (!data || !data.label) {
                throw new Error("Unexpected response from server.");
            }

            navigate("/results", { state: { result: data, fileName: file.name } });
        } catch (err) {
            setLoading(false);
            setStatusMsg("");
            setError(err.message || "Failed to process audio.");
            console.error("Upload Error:", err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Upload Your Audio
                </Typography>
                <form onSubmit={handleUpload}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Button variant="outlined" component="label">
                            Choose File
                            <input type="file" hidden onChange={handleFileChange} accept=".mp3, .wav" />
                        </Button>
                        {file && (
                            <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
                                Selected file: {file.name}
                            </Typography>
                        )}
                        <Button variant="contained" color="primary" type="submit" disabled={loading}>
                            Upload & Analyze
                        </Button>
                        {loading && (
                            <>
                                <Typography variant="body2">{statusMsg}</Typography>
                                <LinearProgress />
                            </>
                        )}
                    </Box>
                </form>
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Paper>
        </Container>
    );
};

export default UploadForm;