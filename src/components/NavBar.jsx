import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Container, Button, Box, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = ({ darkMode, setDarkMode }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Initialize darkMode from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setDarkMode(savedTheme === "dark");
        } else {
            // Set light mode as default if no theme is saved
            setDarkMode(false);
            localStorage.setItem("theme", "light");
        }
    }, [setDarkMode]);

    const handleToggle = () => {
        setDarkMode((prev) => {
            const newTheme = !prev;
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            return newTheme;
        });
    };
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const navItems = [
        { text: "Home", path: "/" },
        { text: "Learn More", path: "/learn-more" },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    mb: 3,
                    background: darkMode
                        ? 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)'
                        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ py: 1 }}>
                        {/* Mobile Menu Button */}
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                display: { xs: "flex", md: "none" },
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                }
                            }}
                        >
                            <Menu />
                        </IconButton>

                        {/* Title & Home Link */}
                        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                            <Typography
                                variant="h5"
                                component={motion.div}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                to="/"
                                sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    fontWeight: "bold",
                                    mr: 2,
                                    letterSpacing: 1,
                                }}
                            >
                                fAKE BREAKer
                            </Typography>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.text}
                                    component={Link}
                                    to={item.path}
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            width: '0%',
                                            height: '2px',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            backgroundColor: 'white',
                                            transition: 'width 0.3s ease-in-out',
                                        },
                                        '&:hover::after': {
                                            width: '100%',
                                        },
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                            <IconButton
                                color="inherit"
                                onClick={handleToggle}
                                sx={{
                                    '&:hover': {
                                        transform: 'rotate(180deg)',
                                        transition: 'transform 0.5s ease-in-out',
                                    }
                                }}
                            >
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
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        background: darkMode
                            ? 'linear-gradient(45deg, #1a1a1a 30%, #2a2a2a 90%)'
                            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white',
                    }
                }}
            >
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                onClick={handleDrawerToggle}
                                sx={{
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.1)',
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        textAlign: 'center',
                                        '& .MuiTypography-root': {
                                            fontWeight: 'bold',
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleToggle}
                            sx={{
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            <ListItemText
                                primary={darkMode ? "Light Mode" : "Dark Mode"}
                                sx={{
                                    textAlign: 'center',
                                    '& .MuiTypography-root': {
                                        fontWeight: 'bold',
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default NavBar;
