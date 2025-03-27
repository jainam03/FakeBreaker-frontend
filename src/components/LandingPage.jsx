import { Container, Typography, Button, Box, Card, CardContent } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const steps = [
    { title: "Upload", description: "Upload an MP3/WAV file for analysis.", icon: <CloudUploadIcon fontSize="large" color="primary" /> },
    { title: "Analysis", description: "Our AI model processes the audio file.", icon: <GraphicEqIcon fontSize="large" color="secondary" /> },
    { title: "Results", description: "View the deepfake probability score.", icon: <CheckCircleIcon fontSize="large" color="success" /> },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <Container
                maxWidth="md"
                sx={{
                    textAlign: "center",
                    mt: { xs: 3, md: 5 },
                    py: { xs: 3, md: 5 },
                    px: { xs: 2, md: 4 },
                    background: "linear-gradient(135deg, #1976D2 30%, #42A5F5 90%)",
                    borderRadius: "15px",
                    color: "white",
                }}
            >
                <Typography variant= "h4" md="h3"  fontWeight="bold" gutterBottom>
                    Welcome to Fake Breaker!
                </Typography>
                <Typography variant="h6" >
                    Upload an audio file and let our AI analyze it for deepfake characteristics in seconds.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth={{ xs: true, sm: false }}
                    sx={{ backgroundColor: "white", color: "#1976D2", fontWeight: "bold", mt: 2 }}
                    onClick={() => navigate("/upload")}
                >
                    Upload & Analyse
                </Button>
                <Box mt={2}>
                <Typography variant="caption" fontWeight="bold" fontSize="medium" >Let's unmask the digital deception 💪</Typography>

                </Box>
            </Container>

            {/* How It Works - Three-Step Card Layout */}
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
                    How It Works
                </Typography>
                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
                    gap={3}
                >
                    {steps.map((step, index) => (
                        <Card key={index} sx={{ textAlign: "center", p: { xs: 2, md: 3 } }}>
                            <CardContent>
                                {step.icon}
                                <Typography variant="h6" fontWeight="bold" mt={2}>
                                    {step.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mt={1}>
                                    {step.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>
        </>
    );
}
