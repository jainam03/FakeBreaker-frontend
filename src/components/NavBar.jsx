import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Container, Button, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavBar = ({ darkMode, setDarkMode }) => {
    const handleToggle = () => setDarkMode((prev) => !prev);

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Container maxWidth="lg">
                <Toolbar>
                    {/* Title & Home Link Together */}
                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: "none",
                                color: "inherit",
                                fontWeight: "bold",
                                mr: 2,
                            }}
                        >
                            fAKE BREAKer
                        </Typography>
                        <Button component={Link} to="/" color="inherit" sx={{ textTransform: "none" }}>
                            Home
                        </Button>
                    </Box>

                    {/* Other Links & Theme Toggle */}
                    <Button component={Link} to="/learn-more" color="inherit" sx={{ mr: 2 }}>
                        Learn More
                    </Button>
                    <IconButton color="inherit" onClick={handleToggle}>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
