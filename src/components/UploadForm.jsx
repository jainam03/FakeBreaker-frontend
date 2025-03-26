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
    Modal,
    Tooltip
} from "@mui/material";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const navigate = useNavigate();

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);

        const uploadSimulation = setInterval(() => {
            setUploadProgress((oldProgress) => {
                const newProgress = oldProgress >= 100 ? 100 : oldProgress + 10
                if (newProgress === 100) {
                    clearInterval(uploadSimulation)
                }
                return newProgress
            })
        }, 500)
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
            <Container>
                <Box display="flex" flexDirection="column" gap={3} mb={3}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Tooltip title="Learn about how it works" >
                            <Button variant="outlined" onClick={() => setIsInfoModalOpen(true)} >
                                How it works?
                            </Button>
                        </Tooltip>

                    </Box>
                </Box>

                <Modal open={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} aria-labelledby="how-it-works-modal">
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            outlineColor: 'none',
                            borderBlockColor: 'none',
                            borderInlineColor: 'none',
                        }}
                    >
                        <Typography variant="h6" id="modal-modal-title" gutterBottom>
                            How it works?
                        </Typography>
                        <Box component="ul" ></Box>
                        <Typography component="li">
                            This app uses an extensively trained neural network model to analyze the audio file you upload.
                        </Typography>
                        <Typography component="li">
                            The model predicts the audio's label based on its content.
                        </Typography>
                        <Typography component="li">
                            The model is trained on an vast dataset of audio files with known labels.
                        </Typography>
                        <Typography component="li" >
                            The app sends the audio file to the server, which processes the file and returns the predicted label.
                        </Typography>
                        <Typography component="li" >
                            All that you have to do is just upload any mp3/wav file and hit the analyse button and the rest will be taken care of by the app.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => setIsInfoModalOpen(false)} sx={{ mt: 2 }}>
                            Close
                        </Button>
                    </Box>

                </Modal>
            </Container>
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