// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { uploadAudio } from "../api"; // Ensure your API call function is set up
// import {
//     Button,
//     Typography,
//     Paper,
//     Box,
//     CircularProgress,
//     Alert,
//     Container,
// } from "@mui/material";

// const UploadForm = () => {
//     const [file, setFile] = useState(null);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file) {
//         setError("Please select a file.");
//         return;
//     }

//     setError("");
//     setLoading(true);

//     // ✅ Declare `formData` before using it
//     const formData = new FormData();
//     formData.append("file", file);

//     console.log("Uploading file:", file);
//     console.log("FormData content:", formData.get("file")); // ✅ No more errors

//     try {
//         const response = await fetch("http://localhost:5000/api/upload", {
//             method: "POST",
//             body: formData, // ✅ No need to set headers, fetch does it automatically for FormData
//         });

//         const data = await response.json();
//         setLoading(false);

//         if (!response.ok) {
//             throw new Error(data.error || "Upload failed");
//         }

//         // ✅ If the upload is successful, navigate to the results page
//         navigate("/results", { state: { result: data, fileName: file.name } });

//     } catch (err) {
//         setLoading(false);
//         setError(err.message || "Failed to process audio.");
//         console.error("Upload Error:", err);
//     }
// };

//     return (
//         <Container maxWidth="sm">
//             <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
//                 <Typography variant="h4" gutterBottom>
//                     Upload Your Audio
//                 </Typography>
//                 <form onSubmit={handleUpload}>
//                     <Box display="flex" flexDirection="column" gap={2}>
//                         <Button variant="outlined" component="label">
//                             Choose File
//                             <input type="file" hidden onChange={handleFileChange} accept=".mp3, .wav" />
//                         </Button>
//                         {file && (
//                             <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
//                                 Selected file: {file.name}
//                             </Typography>
//                         )}
//                         <Button variant="contained" color="primary" type="submit" disabled={loading}>
//                             {loading ? <CircularProgress size={24} /> : "Upload & Analyze"}
//                         </Button>
//                     </Box>
//                 </form>
//                 {error && (
//                     <Alert severity="error" sx={{ mt: 2 }}>
//                         {error}
//                     </Alert>
//                 )}
//             </Paper>
//         </Container>
//     );
// };

// export default UploadForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadAudio } from "../api"; // This helper uses the proper API URL via your env variable
import {
    Button,
    Typography,
    Paper,
    Box,
    CircularProgress,
    Alert,
    Container,
} from "@mui/material";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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

        // Create form data and append the selected file
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading file:", file);
        console.log("FormData content:", formData.get("file"));

        try {
            // Instead of using a hardcoded URL, we use the helper function
            const data = await uploadAudio(formData);
            setLoading(false);

            // If the upload is successful, navigate to the results page with the response data
            navigate("/results", { state: { result: data, fileName: file.name } });
        } catch (err) {
            setLoading(false);
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
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept=".mp3, .wav"
                            />
                        </Button>
                        {file && (
                            <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
                                Selected file: {file.name}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Upload & Analyze"}
                        </Button>
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