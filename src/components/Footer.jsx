import React from 'react'
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <Box
            component={motion.footer}
            sx={{
                backgroundColor: 'background.paper',
                padding: 1,
                position: 'relative',
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
            }}

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Typography variant='body2' >  Made with 💙 and ✨ by hackerman.</Typography>
            <Typography variant="caption" color="text.secondary">
                &copy; {new Date().getFullYear()} fAKE BREAKer. All rights reserved.
            </Typography>
            <Box sx={{ mt: 1, mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 2 }}>
                <Link to="/learn-more" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="inherit" color="text.primary">
                        Learn More
                    </Typography>
                </Link>

                <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }} >
                    <Typography variant='inherit' >Let's get in touch!</Typography>
                </Link>
            </Box>
        </Box>



    )
}

export default Footer;