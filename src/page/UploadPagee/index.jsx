import { Box, Button, Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from './UploadForm';

export default function index() {
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
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100%', pb: 5, backgroundImage: 'url(/images/background.png)' }}>
        <Button
          sx={{ display: 'block', color: '#ffffff' }}
          onClick={() => {
            navigate('/board');
          }}
        >
          뒤로가기
        </Button>
        <Container sx={{ color: '#ffffff' }} component="main" maxWidth="xs">
          {/* <CssBaseline /> */}
          <Box
            sx={{
              paddingTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}
            >
              음원 업로드
            </Typography>
            <UploadForm />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
