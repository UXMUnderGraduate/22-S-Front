import React from 'react';
import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';

function Error400() {
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
            404 bad request
          </Typography>
          <Typography variant="h4" component="h5" color="secondary" sx={{ marginTop: '3%' }}>
            {'This is not the web page you are looking for.'}
          </Typography>
        </Box>
      </Box>
      =
    </ThemeProvider>
  );
}

export default Error400;
