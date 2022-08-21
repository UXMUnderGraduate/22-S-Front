import React from 'react';
import { Box, Button, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Error403() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#B73DCC',
      },
      secondary: {
        main: '#7966ce',
      },
    },
  });
  const Navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)' }}>
        <Box sx={{ textAlign: 'center', paddingTop: '20%' }}>
          <Typography variant="h1" component="h1" color="primary">
            403 Forbidden
          </Typography>
          <Typography variant="h5" component="h5" color="secondary">
            {"You don't have permission to access"}
          </Typography>
          <Button sx={{ marginTop: '5%' }} onClick={() => Navigate('/login')}>
            Please sign in
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Error403;
