import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { Grid, Typography, Box, Container, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPW] = useState('');
  const [summit, setSummit] = useState(false);

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPW(e.target.value);
  };

  const onClickLogin = () => {
    console.log('로그인');
    console.log('Email:', inputEmail);
    console.log('Pw:', inputPw);
    setSummit(true);
    axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signin`, null, {
        params: {
          email: inputEmail,
          password: inputPw,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem('access_token', res.data);
          sessionStorage.setItem('email', inputEmail);
          const data = res.data;
          const token = data.data.access_token;
          console.log(`JWT Token: ${token}`);
          localStorage.setItem('jwtToken', token);
          Navigate('/board');
        }
      })
      .catch((err) => {
        setSummit(false);
        console.log(err.error);
        console.log(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signin`);
        alert('아이디와 비밀번호를 확인해주세요');
      });
  };
  const Navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)' }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              paddingTop: 15,
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
              sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
              color="secondary"
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              required
              fullWidth
              autoFocus
              onChange={handleInputEmail}
              value={inputEmail}
            />
            <TextField
              sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
              color="secondary"
              margin="normal"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
              onChange={handleInputPw}
              value={inputPw}
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
            {summit === false ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onClickLogin}
                style={{ backgroundColor: '#7966ce', height: '60px', fontSize: '20px' }}
              >
                로그인
              </Button>
            ) : null}
            <Grid container>
              <Grid item xs>
                <Link
                  sx={{ color: '#7966ce' }}
                  onClick={() => {
                    Navigate('/register');
                  }}
                >
                  {'회원가입'}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  sx={{ color: '#7966ce' }}
                  onClick={() => {
                    Navigate('/');
                  }}
                >
                  {'메인으로 이동'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
