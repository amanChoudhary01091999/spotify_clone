import { Box, CircularProgress } from '@mui/material';
import React from 'react';


const Loader = () => {
    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            color: '#EDEADE',
            fontSize: '2rem',
            fontFamily: "Montserrat sans-serif",
        }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    );
};

export default Loader;
