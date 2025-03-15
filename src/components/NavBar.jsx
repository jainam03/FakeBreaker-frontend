// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Container } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavBar = ({ darkMode, setDarkMode }) => {
    const handleToggle = () => setDarkMode((prev) => !prev);

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: "bold",
                        }}
                    >
                        fAKE BREAKer
                    </Typography>
                    <IconButton color="inherit" onClick={handleToggle}>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
