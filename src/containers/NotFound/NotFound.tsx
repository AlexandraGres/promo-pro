import { Box, Button, Typography } from '@mui/material';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate('/');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '10rem', fontWeight: 'bold', color: '#1976d2' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, textAlign: 'center', maxWidth: 400 }}>
        Sorry, the page you are looking for doesn&apos;t exist. You may have mistyped the address or
        the page may have moved.
      </Typography>
      <Button sx={{ py: 1, px: 3 }} variant="contained" color="primary" onClick={handleGoHome}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
