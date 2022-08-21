import React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { Grid, Typography, Box, Container, createTheme, ThemeProvider } from '@mui/material';

function LoginPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#550064',
      },
      secondary: {
        main: '#7966ce',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)' }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              paddingTop: 35,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              component="h1"
              varient="h1"
              style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}
            >
              Login
            </Typography>
            <TextField
              sx={{ backgroundColor: 'white', borderRadius: "0.5em", }}
              color="secondary"
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              required
              fullWidth
              autoFocus
            />
            <TextField
              sx={{ backgroundColor: 'white' , borderRadius: "0.5em",}}
              color="secondary"
              margin="normal"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
            />

            <FormControlLabel
              sx={{ color: '#7966ce' }}
              control={
                <Checkbox
                  value="remember"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, color: 'white', '&.Mui-checked': { color: '#7966ce' } }}
                />
              }
              label="자동로그인"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#7966ce', height: '60px', fontSize: '20px' }}
            >
              {' '}
              로그인{' '}
            </Button>
            <Grid container>
              <Grid item xs>
                {' '}
                <Link href="/register" style={{ color: '#B73DCC', textDecoration: 'none' }}>
                  {' '}
                  회원가입{' '}
                </Link>{' '}
              </Grid>
              <Grid item>
                {' '}
                <Link href="/" style={{ color: '#B73DCC', textDecoration: 'none' }}>
                  {' '}
                  메인으로 이동{' '}
                </Link>{' '}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
