import React from 'react';
import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import MainHeader from '../components/MainHeader';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const Navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#550064',
      },
      secondary: {
        main: '#7966ce',
      },
      header: {
        main: 'transparent',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)' }}>
        <MainHeader />
        <Typography pt="8%" align="center" variant="h3" component="h2" sx={{ color: 'white' }}>
          The UXM Music Platform
        </Typography>
        <Typography pt="2%" align="center" variant="h4" component="h2" sx={{ color: 'white' }}>
          SMWYG
        </Typography>

        <Box textAlign="center" pt="6%" sx={{ color: 'white' }}>
          <Typography pt="2%" variant="h4" component="h2" sx={{ color: 'white' }}>
            Thanks for listening. Now join in.
          </Typography>
          <Typography pt="2%" variant="h6" component="h2" sx={{ color: 'white' }}>
            Save tracks, follow artists and build playlist. All for free.
          </Typography>
          <Button
            variant="contained"
            sx={{ margin: '2%' }}
            onClick={() => {
              Navigate('/register');
            }}
          >
            Create account
          </Button>
          <br />
          <Box>
            Already have an account?
            <Button
              sx={{ marginLeft: '1%' }}
              variant="outlined"
              color="secondary"
              onClick={() => {
                Navigate('/login');
              }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MainPage;
