import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Container,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const NavBar = ({ darkMode, setDarkMode }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleToggle = () => setDarkMode((prev) => !prev);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
        <>
            <AppBar position="static" sx={{ mb: 3 }}>
                <Container maxWidth="lg">
                    <Toolbar>
                        {/* Mobile Menu Button */}
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { xs: "flex", md: "none" } }}
                        >
                            <Menu />
                        </IconButton>

                        {/* Title & Home Link (Always Visible) */}
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
                            <Button component={Link} to="/" color="inherit">
                                Home
                            </Button>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                            <Button component={Link} to="/learn-more" color="inherit">
                                Learn More
                            </Button>
                            <IconButton color="inherit" onClick={handleToggle}>
                                {darkMode ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{ "& .MuiDrawer-paper": { width: 240 } }}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/learn-more" onClick={handleDrawerToggle}>
                            <ListItemText primary="Learn More" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleToggle}>
                            <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default NavBar;
