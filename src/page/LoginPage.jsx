import React, {useState} from 'react';
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
  const [inputEmail, setInputEmail] = useState('')
  const [inputPw, setInputPW] = useState('')

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }

  const handleInputPw = (e) => {
    setInputPW(e.target.value)
  }

  const onClickLogin = () => {
    console.log('로그인');
    console.log('Email:', inputEmail);
    console.log('Pw:', inputPw);
    axios.post('http://192.168.0.2:9494/api/v1/auth/signin', null, {
      params: {
        'email' : inputEmail,
        'password' : inputPw
      }
    })
    .then(res => {
        console.log(res)
        console.log('res.data.userId :: ', res.data.userId)
        console.log('res.data.msg :: ', res.data.msg)
        if(res.data.email === undefined){
            // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
            console.log('======================',res.data.msg)
            alert('입력하신 id 가 일치하지 않습니다.')
        } else if(res.data.email === null){
            // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
            console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
            alert('입력하신 비밀번호 가 일치하지 않습니다.')
         } else if(res.data.email === inputEmail) {
             // id, pw 모두 일치 userId = userId1, msg = undefined
             console.log('======================','로그인 성공')
            sessionStorage.setItem('user_email', inputEmail)
            // 작업 완료 되면 페이지 이동(새로고침)
             document.location.href = '/'
        }
     })
    .catch()
  }
  const Navigate = useNavigate();
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
              value={inputEmail}/>
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
            <Grid container>
              <Grid item xs>
              <Link
                onClick={() => {
                  Navigate('/register');
                }}
              >
                {'회원가입'}
              </Link>
              </Grid>
              <Grid item>
              <Link
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
