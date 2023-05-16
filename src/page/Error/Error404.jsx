import React from 'react';
import { Box, createTheme, ThemeProvider, Typography, Button } from '@mui/material';

function Error404() {
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
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)' }}>
        <Box sx={{ textAlign: 'center', paddingTop: '20%' }}>
          <Typography variant="h1" component="h1" color="primary">
            404 Not Found
          </Typography>
          <Typography variant="h4" component="h5" color="secondary" sx={{ marginTop: '3%' }}>
            {'This is not the web page you are looking for.'}
          </Typography>
        </Box>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginTop: '3%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
          onClick={() => window.location.replace('/')}
        >
          홈화면으로
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Error404;
